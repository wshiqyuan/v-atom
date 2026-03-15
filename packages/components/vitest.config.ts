import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vitest/config'

export default defineConfig ({
  plugins: [
    vue() as PluginOption,
    vueJsx() as PluginOption,
  ],
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
