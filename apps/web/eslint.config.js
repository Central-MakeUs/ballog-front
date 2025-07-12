// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      '@ballog/eslint',
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
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
      // FSD Architecture Rules - Core Principles Only
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            // Core FSD principle: Higher layers cannot import from lower layers
            {
              group: ['shared/*', 'entities/*', 'features/*', 'widgets/*'],
              message: 'App layer cannot import from lower layers',
              when: {
                files: ['**/app/**/*'],
              },
            },
            {
              group: ['shared/*', 'entities/*', 'features/*'],
              message: 'Pages layer cannot import from lower layers',
              when: {
                files: ['**/pages/**/*'],
              },
            },
            {
              group: ['shared/*', 'entities/*'],
              message: 'Widgets layer cannot import from lower layers',
              when: {
                files: ['**/widgets/**/*'],
              },
            },
            {
              group: ['shared/*'],
              message: 'Features layer cannot import from lower layers',
              when: {
                files: ['**/features/**/*'],
              },
            },
            {
              group: [
                'app/*',
                'pages/*',
                'widgets/*',
                'features/*',
                'entities/*',
              ],
              message: 'Shared layer cannot import from higher layers',
              when: {
                files: ['**/shared/**/*'],
              },
            },
          ],
        },
      ],
    },
  },

  // Optional: More flexible cross-slice rules (warning level)
  {
    files: ['**/entities/**/*', '**/features/**/*', '**/widgets/**/*'],
    rules: {
      'no-restricted-imports': [
        'warn', // error -> warn으로 변경
        {
          patterns: [
            {
              group: ['entities/*', 'features/*', 'widgets/*'],
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
