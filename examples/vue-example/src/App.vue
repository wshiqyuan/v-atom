<script setup lang="ts">
import { ref, h, onMounted } from 'vue'
import type { MenuOption } from '../node_modules/@v-atom/components/dropdown/src/types'
import { Dropdown } from '../node_modules/@v-atom/components/dropdown'
import { createMessage } from '../node_modules/@v-atom/components/message/src/method'
import { Button } from '../node_modules/@v-atom/components/button'
import { Collapse, CollapseItem } from '../node_modules/@v-atom/components/collapse'
import { Icon } from '../node_modules/@v-atom/components/icon'
import { Alert } from '../node_modules/@v-atom/components/alert'

const openValue = ref(['a'])

const menuOptions: MenuOption[] = [
  {
    label: h('b', 'this is bold'),
    key: '1'
  },
  {
    label: 'Option 2',
    key: '2',
    disabled: true
  },
  {
    label: 'Option 3',
    key: '3',
    divided: true
  },
  {
    label: 'Option 4',
    key: '4'
  }
]

onMounted(() => {
  createMessage({
    message: 'hello world',
    duration: 0
  })
  createMessage({
    message: 'hello world again',
    duration: 0
  })
})
</script>

<template>
  <div>
    <Icon icon="fa-solid fa-house-user" color="#1781b5" />

    <Button ref="buttonRef">Test Button</Button>
    <Button plain>Plain Button</Button>
    <Button round>Round Button</Button>
    <Button circle>VK</Button>
    <Button disabled>Disabled Button</Button><br/><br/>
    <Button type="primary">Primary</Button>
    <Button type="success">Success</Button>
    <Button type="info">Info</Button>
    <Button type="warning">Warning</Button>
    <Button type="danger">Danger</Button><br/><br/>
    <Button type="primary" plain>Primary</Button>
    <Button type="success" plain>Success</Button>
    <Button type="info" plain>Info</Button>
    <Button type="warning" plain>Warning</Button>
    <Button type="danger" plain>Danger</Button><br/><br/>
    <Button size="large">Large</Button>
    <Button size="small">Small</Button><br/><br/>
    <Button type="primary" loading>Primary</Button>
    <Button type="primary" icon="arrow-up">icon</Button>
    
    <Collapse v-model="openValue" accordion>
      <CollapseItem name="a">
        <template #title>
          <h1>nice title</h1>
        </template>
        <h1>handle title</h1>
        <div>this is a content</div>
      </CollapseItem>
      <CollapseItem name="b" title="nice title item b">
        <div>this is b content</div>
      </CollapseItem>
      <CollapseItem name="c" title="nice title item c" disabled>
        <div>this is c content</div>
      </CollapseItem>
    </Collapse>
    {{ openValue }}

    <Alert show-icon type="primary" title="test error">
      <span>tess content</span>
    </Alert>
    <Alert show-icon type="success" content="test">
      <template #title>
        <h1>test title</h1>
      </template>
    </Alert>
    <Alert show-icon type="info" content="test" />
    <Alert show-icon type="danger" content="test" />
    <Alert show-icon type="warning" content="test" />

    <Dropdown content="test" trigger="click" :menu-options="menuOptions">
      <div>Tooltip test div</div>
      <template #content>
        <h1>Hello</h1>
      </template>
    </Dropdown>
  </div>
</template>

<style scoped></style>