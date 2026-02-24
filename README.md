<div align="center">
  <h1>V-Atom-ui</h1>
  <h3>V-Atom-ui 是一个基于 Vue3 的现代化轻量级 UI 组件库，帮助开发者快速搭建项目。</h3>

  <p align="center">
    <a href="https://github.com/wshiqyuan/v-atom">
      <img src="https://img.shields.io/badge/github-VAtomUi-blue?logo=github" />
    </a>
    <a>
      <img src="https://img.shields.io/badge/License-MIT-green" />
    </a>
    <br>
  </p>

</div>

## 特性

- 🚀 基于 Vue 3 和 TypeScript 构建
- 💡 现代化、轻量级的设计理念
- 📦 提供丰富的常用 UI 组件
- 🎨 易于定制的主题系统
- 🔧 支持按需加载
- ✅ 类型安全，提供完整的 TypeScript 支持

## 安装

使用 npm:

```bash
npm install v-atom-ui
```

使用 yarn:

```bash
yarn add v-atom-ui
```

使用 pnpm：

```bash
pnpm add v-atom-ui
```

## 依赖安装

除了基本安装外，您可能还需要安装以下依赖（如果您的项目中还没有的话）：

```bash
npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/vue-fontawesome lodash-es async-validator
```

## 快速开始

全局引入

```javascript
import VAtom from 'v-atom-ui'
import { createApp } from 'vue'
import App from './App.vue'
import 'v-atom-ui/theme/index.css'

const app = createApp(App)

app.use(VAtom)
app.mount('#app')
```

按需引入

```javascript
import { VaButton } from 'v-atom-ui'
```
## 已支持组件
- ✅ Alert - 警告提示
- ✅ Button - 按钮
- ✅ Collapse - 折叠面板
- ✅ Dropdown - 下拉菜单
- ✅ Form - 表单
- ✅ Icon - 图标
- ✅ Input - 输入框
- ✅ Message - 消息提示
- ✅ Select - 选择器
- ✅ Switch - 开关
- ✅ Tooltip - 文字提示

## 许可证
[MIT](./LICENSE) License
