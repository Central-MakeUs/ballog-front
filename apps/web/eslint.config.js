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
      // FSD Architecture Rules
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            // Shared layer cannot import from any other layer
            {
              group: [
                'app/*',
                'pages/*',
                'widgets/*',
                'features/*',
                'entities/*',
              ],
              importNames: ['*'],
              message: 'Shared layer cannot import from higher layers',
              when: {
                files: ['**/shared/**/*'],
              },
            },

            // Entities layer restrictions
            {
              group: ['app/*', 'pages/*', 'widgets/*', 'features/*'],
              importNames: ['*'],
              message:
                'Entities layer cannot import from higher layers (app, pages, widgets, features)',
              when: {
                files: ['**/entities/**/*'],
              },
            },

            // Features layer restrictions
            {
              group: ['app/*', 'pages/*', 'widgets/*'],
              importNames: ['*'],
              message:
                'Features layer cannot import from higher layers (app, pages, widgets)',
              when: {
                files: ['**/features/**/*'],
              },
            },

            // Widgets layer restrictions
            {
              group: ['app/*', 'pages/*'],
              importNames: ['*'],
              message:
                'Widgets layer cannot import from higher layers (app, pages)',
              when: {
                files: ['**/widgets/**/*'],
              },
            },

            // Same layer slice restrictions
            {
              group: ['entities/*/'],
              importNames: ['*'],
              message:
                'Entities cannot import from other entities slices directly',
              when: {
                files: ['**/entities/**/*'],
              },
            },

            {
              group: ['features/*/'],
              importNames: ['*'],
              message:
                'Features cannot import from other features slices directly',
              when: {
                files: ['**/features/**/*'],
              },
            },

            {
              group: ['widgets/*/'],
              importNames: ['*'],
              message:
                'Widgets cannot import from other widgets slices directly',
              when: {
                files: ['**/widgets/**/*'],
              },
            },

            // Internal structure restrictions
            {
              group: ['*/model/*', '*/lib/*', '*/config/*'],
              importNames: ['*'],
              message:
                'UI layer should not import from model, lib, or config directly. Use public API (index.ts)',
              when: {
                files: ['**/ui/**/*'],
              },
            },
          ],
        },
      ],

      // Enforce public API usage
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '**/entities/*/api/*',
                '**/entities/*/model/*',
                '**/entities/*/lib/*',
                '**/entities/*/ui/*',
              ],
              message:
                'Import from public API (entities/[slice]/index.ts) instead of internal modules',
            },
            {
              group: [
                '**/features/*/api/*',
                '**/features/*/model/*',
                '**/features/*/lib/*',
                '**/features/*/ui/*',
              ],
              message:
                'Import from public API (features/[slice]/index.ts) instead of internal modules',
            },
            {
              group: [
                '**/widgets/*/api/*',
                '**/widgets/*/model/*',
                '**/widgets/*/lib/*',
                '**/widgets/*/ui/*',
              ],
              message:
                'Import from public API (widgets/[slice]/index.ts) instead of internal modules',
            },
            {
              group: [
                '**/shared/*/api/*',
                '**/shared/*/model/*',
                '**/shared/*/lib/*',
                '**/shared/*/ui/*',
              ],
              message:
                'Import from public API (shared/[segment]/index.ts) instead of internal modules',
            },
          ],
        },
      ],
    },
  },

  // Layer-specific rules
  {
    files: ['**/shared/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                'app/*',
                'pages/*',
                'widgets/*',
                'features/*',
                'entities/*',
              ],
              message: 'Shared layer cannot import from any higher layers',
            },
          ],
        },
      ],
    },
  },

  {
    files: ['**/entities/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['app/*', 'pages/*', 'widgets/*', 'features/*'],
              message:
                'Entities cannot import from app, pages, widgets, or features layers',
            },
            {
              group: ['entities/*'],
              message:
                'Entities cannot import from other entity slices. Use shared layer for common logic.',
            },
          ],
        },
      ],
    },
  },

  {
    files: ['**/features/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['app/*', 'pages/*', 'widgets/*'],
              message:
                'Features cannot import from app, pages, or widgets layers',
            },
            {
              group: ['features/*'],
              message:
                'Features cannot import from other feature slices. Use shared layer or entities for common logic.',
            },
          ],
        },
      ],
    },
  },

  {
    files: ['**/widgets/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['app/*', 'pages/*'],
              message: 'Widgets cannot import from app or pages layers',
            },
            {
              group: ['widgets/*'],
              message:
                'Widgets cannot import from other widget slices. Use shared layer for common logic.',
            },
          ],
        },
      ],
    },
  },

  {
    files: ['**/pages/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['app/*'],
              message: 'Pages cannot import from app layer',
            },
          ],
        },
      ],
    },
  },

  storybook.configs['flat/recommended'],
)
