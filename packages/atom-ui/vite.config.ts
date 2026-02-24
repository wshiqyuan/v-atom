import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  resolve: {
    alias: {
      '@v-atom/components': '../../packages/components',
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    dts({
      entryRoot: resolve(__dirname, '..'),
      include: [
        resolve(__dirname, './index.ts'),
        resolve(__dirname, './defaults.ts'),
        resolve(__dirname, './components.ts'),
        resolve(__dirname, './install-macker.ts'),
        resolve(__dirname, '../components/**/*.{vue,ts,tsx}'),
        resolve(__dirname, '../utils/**/*.ts'),
        resolve(__dirname, '../hooks/**/*.ts'),
      ],
      outDir: 'dist/types',
      exclude: [
        resolve(__dirname, '../**/__tests__/**'),
        resolve(__dirname, '../**/*.test.{ts,tsx}'),
        resolve(__dirname, '../**/*.config.ts'),
      ],
    }),
  ],
  build: {
    lib: {
      entry: './index.ts',
      name: 'VAtom',
      fileName: 'v-atom',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'vue',
        '@fortawesome/vue-fontawesome',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        'async-validator',
        'lodash-es',
      ],
    },
    sourcemap: true,
    minify: 'esbuild',
    emptyOutDir: true,
  },
})
