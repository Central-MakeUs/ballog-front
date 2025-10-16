import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import promisePlugin from 'eslint-plugin-promise'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import globals from 'globals'
import boundaries from 'eslint-plugin-boundaries'

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Base config for all files
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },

  // JavaScript files
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    ...js.configs.recommended,
    plugins: {
      import: importPlugin,
      promise: promisePlugin,
    },
    rules: {
      'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
      'no-console': 'error',
      'no-empty-function': 'off',
      'no-implicit-coercion': ['error', { allow: ['!!'] }],
      'no-return-await': 'error',
      'no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
      'no-unused-vars': [
        'error',
        { ignoreRestSiblings: true, argsIgnorePattern: '^_+$' },
      ],
      'no-use-before-define': ['error', { functions: false }],
      'no-void': ['error', { allowAsStatement: true }],
      'object-shorthand': ['error', 'properties'],
      'require-atomic-updates': 'off',

      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: '@/**',
              group: 'parent',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],
      'import/newline-after-import': 'error',

      'promise/catch-or-return': ['error', { allowFinally: true }],
      'promise/prefer-await-to-callbacks': 'error',
      'promise/prefer-await-to-then': 'error',
    },
  },

  // TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      import: importPlugin,
      promise: promisePlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescriptEslint.configs.recommended.rules,

      'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
      'no-console': 'error',
      'no-empty-function': 'off',
      'no-implicit-coercion': ['error', { allow: ['!!'] }],
      'no-return-await': 'error',
      'object-shorthand': ['error', 'properties'],
      'require-atomic-updates': 'off',
      'no-void': ['error', { allowAsStatement: true }],

      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/explicit-member-accessibility': 'error',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-object-type': [
        'error',
        { allowInterfaces: 'always' },
      ],

      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': [
        'error',
        { functions: false },
      ],
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { ignoreRestSiblings: true, argsIgnorePattern: '^_+$' },
      ],

      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: '@/**',
              group: 'parent',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],
      'import/newline-after-import': 'error',
      'import/named': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',

      'promise/catch-or-return': ['error', { allowFinally: true }],
      'promise/prefer-await-to-callbacks': 'error',
      'promise/prefer-await-to-then': 'error',
    },
  },

  // FSD rule
  {
    plugins: { boundaries },
    settings: {
      'boundaries/elements': [
        { type: 'shared', pattern: '**/src/shared/*' },
        { type: 'entities', pattern: '**/src/entities/*' },
        { type: 'features', pattern: '**/src/features/*' },
        { type: 'widgets', pattern: '**/src/widgets/*' },
        { type: 'pages', pattern: '**/src/pages/*' },
      ],
    },
    rules: {
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            // shared: shared 내부만
            { from: 'shared', allow: ['shared'] },

            // entities: shared, entities 만
            { from: 'entities', allow: ['shared', 'entities'] },

            // features: shared, entities, features 만
            { from: 'features', allow: ['shared', 'entities', 'features'] },

            // widgets: shared, entities, features, widgets만
            {
              from: 'widgets',
              allow: ['shared', 'entities', 'features', 'widgets'],
            },

            // pages: 제약 없음
            {
              from: 'pages',
              allow: ['shared', 'entities', 'features', 'widgets', 'pages'],
            },
          ],
        },
      ],
    },
  },

  // 동일 레이어 import 는 경고 처리
  {
    files: ['**/src/entities/**/*.{ts,tsx,js,jsx}'],
    rules: {
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            '@/entities/**',
            '../entities/**',
            '../../entities/**',
            '../../../entities/**',
          ],
        },
      ],
    },
  },
  {
    files: ['**/src/features/**/*.{ts,tsx,js,jsx}'],
    rules: {
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            '@/features/**',
            '../features/**',
            '../../features/**',
            '../../../features/**',
          ],
        },
      ],
    },
  },
  {
    files: ['**/src/widgets/**/*.{ts,tsx,js,jsx}'],
    rules: {
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            '@/widgets/**',
            '../widgets/**',
            '../../widgets/**',
            '../../../widgets/**',
          ],
        },
      ],
    },
  },
]
