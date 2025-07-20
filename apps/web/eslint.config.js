// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'
import ballogConfig from '@ballog/eslint'
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...ballogConfig,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        root: true,
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

  // FSD Architecture Rules - 각 레이어별 별도 설정
  // Shared layer 규칙
  {
    files: ['**/shared/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '../app/*',
                '../pages/*',
                '../widgets/*',
                '../features/*',
                '../entities/*',
              ],
              message: 'Shared layer cannot import from higher layers',
            },
          ],
        },
      ],
    },
  },

  // Entities layer 규칙
  {
    files: ['**/entities/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '../app/*',
                '../pages/*',
                '../widgets/*',
                '../features/*',
              ],
              message: 'Entities layer cannot import from higher layers',
            },
          ],
        },
      ],
    },
  },

  // Features layer 규칙
  {
    files: ['**/features/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../app/*', '../pages/*', '../widgets/*'],
              message: 'Features layer cannot import from higher layers',
            },
          ],
        },
      ],
    },
  },

  // Widgets layer 규칙
  {
    files: ['**/widgets/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../app/*', '../pages/*'],
              message: 'Widgets layer cannot import from higher layers',
            },
          ],
        },
      ],
    },
  },

  // Pages layer 규칙
  {
    files: ['**/pages/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../app/*'],
              message: 'Pages layer cannot import from higher layers',
            },
          ],
        },
      ],
    },
  },

  // Cross-slice 통신에 대한 경고 (더 유연한 규칙)
  {
    files: ['**/entities/**/*', '**/features/**/*', '**/widgets/**/*'],
    rules: {
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            {
              group: ['../entities/*', '../features/*', '../widgets/*'],
              message:
                'Consider using shared layer for cross-slice communication',
            },
          ],
        },
      ],
    },
  },

  storybook.configs['flat/recommended'],
)
