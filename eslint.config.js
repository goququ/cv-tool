import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const importSortGroups = [
  ['^react(?:/.+)?(?:\\u0000)?$', '^react-dom(?:/.+)?(?:\\u0000)?$'],
  ['^(?!(?:react(?:/.+)?|react-dom(?:/.+)?)(?:\\u0000)?$)@?\\w'],
  [
    '^@/',
    '^\\.(?!/?(?:.*\\.(?:css|scss|sass|less|svg|png|jpe?g|gif|webp|avif)$)).+',
  ],
  ['^.+\\.(?:svg|png|jpe?g|gif|webp|avif)$'],
  ['^.+\\.(?:css|scss|sass|less)$'],
]

export default defineConfig([
  globalIgnores(['coverage', 'dist', 'node_modules', 'storybook-static']),
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.node,
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: importSortGroups,
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-unused-vars': 'off',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'simple-import-sort/imports': [
        'error',
        {
          groups: importSortGroups,
        },
      ],
      'simple-import-sort/exports': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['src/pages/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/app', '@/app/*'],
              message: 'Pages must not depend on the app layer.',
            },
            {
              group: ['@/pages', '@/pages/*'],
              message: 'Pages should not depend on other pages directly.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/widgets/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/app',
                '@/app/*',
                '@/pages',
                '@/pages/*',
                '@/widgets',
                '@/widgets/*',
              ],
              message:
                'Widgets may depend only on features, entities, and shared layers.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/features/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/app',
                '@/app/*',
                '@/pages',
                '@/pages/*',
                '@/widgets',
                '@/widgets/*',
                '@/features',
                '@/features/*',
              ],
              message:
                'Features may depend only on entities and shared layers.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/entities/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/app',
                '@/app/*',
                '@/pages',
                '@/pages/*',
                '@/widgets',
                '@/widgets/*',
                '@/features',
                '@/features/*',
                '@/entities',
                '@/entities/*',
              ],
              message: 'Entities may depend only on the shared layer.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/shared/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/app',
                '@/app/*',
                '@/pages',
                '@/pages/*',
                '@/widgets',
                '@/widgets/*',
                '@/features',
                '@/features/*',
                '@/entities',
                '@/entities/*',
                '@/shared',
                '@/shared/*',
              ],
              message:
                'Shared modules should use relative imports inside the shared layer.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.{test,spec}.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        afterAll: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        beforeEach: 'readonly',
        describe: 'readonly',
        expect: 'readonly',
        it: 'readonly',
        test: 'readonly',
        vi: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-restricted-imports': 'off',
    },
  },
  {
    files: ['**/*.stories.{ts,tsx}'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
  eslintConfigPrettier,
])
