<template>
  <div class="lowcode-app">
    <Sidebar />
    <Canvas />
    <PropertiesPanel />
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import Canvas from './components/Canvas.vue'
import PropertiesPanel from './components/PropertiesPanel.vue'
</script>

<style scoped>
.lowcode-app {
  display: flex;
  height: 100%;
}
</style>
