<script setup lang="ts">
import { ref } from 'vue'
import { Tooltip } from '../node_modules/@v-atom/components/tooltip'
import { Button } from '../node_modules/@v-atom/components/button'
import { Collapse, CollapseItem } from '../node_modules/@v-atom/components/collapse'
import { Icon } from '../node_modules/@v-atom/components/icon'
import { Alert } from '../node_modules/@v-atom/components/alert'

const openValue = ref(['a'])
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

    <Tooltip content="test" trigger="hover" :popper-options="{ placement: 'bottom-start', strategy: 'fixed' }" :open-delay="200" :close-delay="500">
      <div>Tooltip test div</div>
      <template #content>
        <h1>Hello</h1>
      </template>
    </Tooltip>
  </div>
</template>

<style scoped></style>