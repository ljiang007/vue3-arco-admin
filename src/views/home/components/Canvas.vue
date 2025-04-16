<template>
    <div class="canvas" @dragover.prevent @drop="handleDrop">
      <div
        v-for="(item, index) in componentList"
        :key="index"
        class="canvas-item"
        :style="item.style"
        @click.stop="selectItem(index)"
      >
        <component :is="getRenderComponent(item)" v-bind="item.props" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // 当前画布上的组件列表
  const componentList = ref([])
  
  // 获取拖拽数据并添加到列表中
  const handleDrop = (event) => {
    const data = event.dataTransfer.getData('component')
    if (data) {
      const component = JSON.parse(data)
      componentList.value.push({
        type: component.type,
        props: getDefaultProps(component.type),
        style: {
          padding: '8px',
          margin: '8px',
          border: '1px dashed #ccc'
        }
      })
    }
  }
  
  // 根据类型返回默认 props
  const getDefaultProps = (type) => {
    switch (type) {
      case 'text':
        return { innerText: '我是文字' }
      case 'button':
        return { innerText: '按钮' }
      case 'image':
        return { src: 'https://via.placeholder.com/100' }
      default:
        return {}
    }
  }
  
  // 根据组件类型返回渲染标签
  const getRenderComponent = (item) => {
    switch (item.type) {
      case 'text':
        return 'div'
      case 'button':
        return 'button'
      case 'image':
        return 'img'
      default:
        return 'div'
    }
  }
  
  const selectItem = (index) => {
    console.log('选中组件：', componentList.value[index])
    // 这里可以配合属性面板使用
  }
  </script>
  
  <style scoped>
  .canvas {
    flex: 1;
    background-color: #fff;
    min-height: 100vh;
    padding: 16px;
    box-sizing: border-box;
    position: relative;
  }
  
  .canvas-item {
    background-color: #fdfdfd;
    cursor: pointer;
  }
  </style>
  