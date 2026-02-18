import { defineConfig } from 'vitepress'
import { vitepressDemoPlugin } from 'vitepress-demo-plugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'V-Atom',
  description: 'Vue-based UI component library',
  markdown: {
    config(md) {
      md.use(vitepressDemoPlugin)
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
      {
        text: 'Basic 基础组件',
        items: [
          { text: 'Button 按钮', link: '/components/button' },
          { text: 'Input 输入框', link: '/components/input' },
          { text: 'Switch 开关', link: '/components/switch' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/wshiqyuan/v-atom' },
    ],
  },
})
