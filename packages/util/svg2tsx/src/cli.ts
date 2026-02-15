#!/usr/bin/env node

import { generateIcons, parseCliArgs } from './generate'

async function run(): Promise<void> {
  const args = process.argv.slice(2)

  if (args.includes('--help') || args.includes('-h')) {
    process.stdout.write(
      [
        'Usage: svg2tsx [--input <dir>] [--output <dir>] [--skip-existing]',
        '',
        'Options:',
        '  --input          Input SVG directory (default: packages/asset/assets/svg)',
        '  --output         Output TSX directory (default: packages/asset/src/generated)',
        '  --skip-existing  Keep existing files and generate only missing icons',
        '  -h, --help       Show help',
      ].join('\n'),
    )
    return
  }

  const options = parseCliArgs(args)
  const result = await generateIcons(options)

  process.stdout.write(
    `svg2tsx done: generated=${result.generated}, skipped=${result.skipped}, output=${result.outputDir}\n`,
  )
}

run().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error)
  process.stderr.write(`${message}\n`)
  process.exit(1)
})
