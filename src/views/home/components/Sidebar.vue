<template>
    <div class="sidebar">
      <h2 class="title">组件列表</h2>
      <div
        class="component-item"
        v-for="component in components"
        :key="component.type"
        draggable="true"
        @dragstart="onDragStart(component)"
      >
        {{ component.label }}
      </div>
    </div>
  </template>
  
  <script setup>
  const components = [
    { type: 'text', label: '文字' },
    { type: 'button', label: '按钮' },
    { type: 'image', label: '图片' }
  ];
  
  const onDragStart = (component) => {
    event.dataTransfer.setData('component', JSON.stringify(component));
  };
  </script>
  
  <style scoped>
  .sidebar {
    width: 200px;
    background-color: #f5f5f5;
    border-right: 1px solid #ddd;
    padding: 16px;
    box-sizing: border-box;
    overflow-y: auto;
  }
  
  .title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 12px;
  }
  
  .component-item {
    padding: 8px 12px;
    background-color: #fff;
    border: 1px solid #ccc;
    margin-bottom: 8px;
    cursor: grab;
    user-select: none;
    border-radius: 4px;
    transition: background-color 0.2s ease;
  }
  
  .component-item:hover {
    background-color: #e6f7ff;
  }
  </style>
  