// stores/useCanvasStore.ts
import { defineStore } from "pinia";

export const useCanvasStore = defineStore("canvas", {
  state: () => ({
    componentList: [],
    selectedIndex: -1,
  }),
  actions: {
    selectComponent(index) {
      this.selectedIndex = index;
    },
    updateComponentProp(key, value) {
      if (this.selectedIndex !== -1) {
        this.componentList[this.selectedIndex].props[key] = value;
      }
    },
    updateComponentStyle(key, value) {
      if (this.selectedIndex !== -1) {
        this.componentList[this.selectedIndex].style[key] = value;
      }
    },
  },
  persist: true,
});
