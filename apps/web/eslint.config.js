// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import { fileURLToPath } from 'node:url'

import ballogConfig from '@ballog/eslint'
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', '.storybook/**/*'] },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...ballogConfig,

  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['.storybook/**/*'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        tsconfigRootDir: fileURLToPath(new URL('.', import.meta.url)),
        project: [
          './tsconfig.json',
          './tsconfig.app.json',
          './tsconfig.node.json',
        ],
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/unbound-method': 'off',
    },
  },
)
