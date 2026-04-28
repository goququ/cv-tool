import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

const storybookDir = path.dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  addons: ['@storybook/addon-a11y'],
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  viteFinal(config) {
    return mergeConfig(config, {
      plugins: [tailwindcss(), svgr()],
      resolve: {
        alias: {
          '@': path.resolve(storybookDir, '../src'),
        },
      },
    })
  },
}

export default config
