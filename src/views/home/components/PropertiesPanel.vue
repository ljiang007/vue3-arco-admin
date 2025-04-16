<template>
  <div class="properties-panel" v-if="selectedComponent">
    <h3>属性编辑</h3>
    <div class="form-group">
      <label>文本内容：</label>
      <input
        v-if="
          selectedComponent.type === 'text' ||
          selectedComponent.type === 'button'
        "
        v-model="selectedComponent.props.innerText"
        @input="onPropChange('innerText', selectedComponent.props.innerText)"
      />
    </div>

    <div class="form-group" v-if="selectedComponent.type === 'image'">
      <label>图片地址：</label>
      <input
        v-model="selectedComponent.props.src"
        @input="onPropChange('src', selectedComponent.props.src)"
      />
    </div>

    <div class="form-group">
      <label>字体大小：</label>
      <input
        type="number"
        v-model="selectedComponent.style.fontSize"
        @input="onStyleChange('fontSize', selectedComponent.style.fontSize)"
      />
    </div>

    <div class="form-group">
      <label>颜色：</label>
      <input
        type="color"
        v-model="selectedComponent.style.color"
        @input="onStyleChange('color', selectedComponent.style.color)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCanvasStore } from "@/store/useCanvasStore";

const canvasStore = useCanvasStore();
const selectedComponent = computed(() => {
  return canvasStore.componentList[canvasStore.selectedIndex] || null;
});

const onPropChange = (key, value) => {
  canvasStore.updateComponentProp(key, value);
};

const onStyleChange = (key, value) => {
  canvasStore.updateComponentStyle(key, value);
};
</script>

<style scoped>
.properties-panel {
  width: 250px;
  padding: 16px;
  background-color: #f5f5f5;
  border-left: 1px solid #ddd;
}

.form-group {
  margin-bottom: 12px;
}

input {
  width: 100%;
}
</style>
