import { defineConfig, mergeConfig } from 'vitest/config'

import viteConfig from './vite.config'

export default mergeConfig(
  // @ts-expect-error
  // 현재 타입 이슈
  // https://github.com/vitest-dev/vitest/issues/18802
  viteConfig,
  defineConfig({
    test: {
      fileParallelism: true,
      name: 'unit',
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
    },
  }),
)
