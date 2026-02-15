import fs from 'node:fs/promises'
import path from 'node:path'

import fg from 'fast-glob'
import { transform } from '@svgr/core'

type GenerateOptions = {
  inputDir: string
  outputDir: string
  skipExisting?: boolean
}

type GenerateResult = {
  generated: number
  skipped: number
  outputDir: string
}

// 불리언 CLI 플래그 존재 여부를 반환합니다.
function parseBooleanFlag(args: string[], name: string): boolean {
  return args.includes(`--${name}`)
}

// 문자열 CLI 플래그 값을 반환하고, 없으면 기본값을 사용합니다.
function parseStringFlag(
  args: string[],
  name: string,
  fallback: string,
): string {
  const idx = args.findIndex((arg) => arg === `--${name}`)
  if (idx === -1) return fallback
  return args[idx + 1] ?? fallback
}

// 파일명을 안전한 PascalCase 컴포넌트 이름으로 변환합니다.
function toPascalCase(raw: string): string {
  const base = raw.replace(/\.svg$/i, '')
  const normalized = base.replace(/[^a-zA-Z0-9]+/g, ' ').trim()
  const pascal = normalized
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')

  if (!pascal) return 'SvgIcon'
  return /^\d/.test(pascal) ? `Svg${pascal}` : pascal
}

// 파일 경로를 POSIX 구분자 형식으로 정규화합니다.
function toPosixPath(filePath: string): string {
  return filePath.split(path.sep).join('/')
}

// 디렉터리 접두어를 사용해 중복 이름을 해소합니다.
function normalizeComponentName(
  relativeSvgPath: string,
  usedNames: Set<string>,
): string {
  const parsed = path.parse(relativeSvgPath)
  const dirParts = parsed.dir
    ? toPosixPath(parsed.dir).split('/').filter(Boolean)
    : []
  const fileStem = toPascalCase(parsed.base)

  let candidate = fileStem
  if (usedNames.has(candidate)) {
    const prefix = dirParts.map(toPascalCase).join('')
    candidate = prefix ? `${prefix}${fileStem}` : fileStem
  }

  if (usedNames.has(candidate)) {
    let suffix = 2
    while (usedNames.has(`${candidate}${suffix}`)) {
      suffix += 1
    }
    candidate = `${candidate}${suffix}`
  }

  usedNames.add(candidate)
  return candidate
}

// 파일 쓰기 전에 디렉터리가 존재하도록 보장합니다.
async function ensureDir(dirPath: string): Promise<void> {
  await fs.mkdir(dirPath, { recursive: true })
}

// 깨끗한 재생성을 위해 출력 디렉터리를 삭제합니다.
async function removeDir(dirPath: string): Promise<void> {
  await fs.rm(dirPath, { recursive: true, force: true })
}

// 경로가 디스크에 존재하는지 확인합니다.
async function exists(targetPath: string): Promise<boolean> {
  try {
    await fs.access(targetPath)
    return true
  } catch {
    return false
  }
}

// 단일 SVG 파일을 TSX 컴포넌트 문자열로 변환합니다.
async function generateOne(
  svgPath: string,
  componentName: string,
): Promise<string> {
  const svgCode = await fs.readFile(svgPath, 'utf8')

  return transform(
    svgCode,
    {
      plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
      typescript: true,
      icon: true,
      ref: false,
      memo: true,
      expandProps: 'end',
      jsxRuntime: 'automatic',
      svgProps: {
        focusable: 'false',
      },
      svgo: true,
      svgoConfig: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
          {
            name: 'prefixIds',
            params: {
              prefix: `ico-${componentName}`,
            },
          },
        ],
      },
      prettier: false,
    },
    {
      componentName,
      filePath: svgPath,
    },
  )
}

// 생성된 아이콘 컴포넌트용 배럴 export 문자열을 생성합니다.
function createBarrelExport(componentNames: string[]): string {
  return `${componentNames
    .sort((a, b) => a.localeCompare(b))
    .map((name) => `export { default as ${name} } from './${name}'`)
    .join('\n')}\n`
}

// 아이콘 컴포넌트를 생성하고 index 배럴 파일을 작성합니다.
export async function generateIcons(
  options: GenerateOptions,
): Promise<GenerateResult> {
  const inputDir = path.resolve(options.inputDir)
  const outputDir = path.resolve(options.outputDir)
  const skipExisting = Boolean(options.skipExisting)

  if (!(await exists(inputDir))) {
    throw new Error(`Input directory does not exist: ${inputDir}`)
  }

  if (!skipExisting) {
    await removeDir(outputDir)
  }
  await ensureDir(outputDir)

  const svgFiles = await fg('**/*.svg', {
    cwd: inputDir,
    absolute: true,
  })

  if (svgFiles.length === 0) {
    await fs.writeFile(path.join(outputDir, 'index.ts'), '', 'utf8')
    return { generated: 0, skipped: 0, outputDir }
  }

  const usedNames = new Set<string>()
  let generated = 0
  let skipped = 0
  const componentNames: string[] = []

  for (const svgPath of svgFiles) {
    const relativeSvgPath = path.relative(inputDir, svgPath)
    const componentName = normalizeComponentName(relativeSvgPath, usedNames)
    const outputFilePath = path.join(outputDir, `${componentName}.tsx`)

    if (skipExisting && (await exists(outputFilePath))) {
      skipped += 1
      componentNames.push(componentName)
      continue
    }

    const tsxCode = await generateOne(svgPath, componentName)
    await fs.writeFile(outputFilePath, tsxCode, 'utf8')
    generated += 1
    componentNames.push(componentName)
  }

  await fs.writeFile(
    path.join(outputDir, 'index.ts'),
    createBarrelExport(componentNames),
    'utf8',
  )

  return { generated, skipped, outputDir }
}

// CLI 인자를 생성 옵션으로 파싱합니다.
export function parseCliArgs(argv: string[]): GenerateOptions {
  const inputDir = parseStringFlag(argv, 'input', 'packages/asset/assets/svg')
  const outputDir = parseStringFlag(
    argv,
    'output',
    'packages/asset/src/generated',
  )
  const skipExisting = parseBooleanFlag(argv, 'skip-existing')

  return { inputDir, outputDir, skipExisting }
}
