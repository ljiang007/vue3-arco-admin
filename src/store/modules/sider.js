import { defineStore } from "pinia";
export const useSiderStore = defineStore("sider", {
    state: () => ({
      siderPath: "/home",
    }),
    actions: {
     
    },
    persist: true
  });