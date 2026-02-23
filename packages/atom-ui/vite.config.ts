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
      root: '.',
      outDir: 'dist/types',
      exclude: ['**/__tests__/'],
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
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
    sourcemap: true,
    minify: 'esbuild',
    emptyOutDir: true,
  },
})
