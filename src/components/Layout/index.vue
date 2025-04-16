<template>
  <a-layout class="layout">
    <a-layout-sider hide-trigger collapsible :collapsed="collapsed">
      <div class="logo" />
      <a-menu
        :defaultOpenKeys="['1']"
        :defaultSelectedKeys="[siderStore.siderPath]"
        :style="{ width: '100%' }"
        @menuItemClick="toPath"
      >
        <template v-for="route in routes" :key="route.path">
          <a-menu-item v-if="route.children.length == 0" :key="`${route.path}`">
            <template #icon>
              <component :is="route.meta?.icon" />
            </template>
            {{ route.meta?.title }}
          </a-menu-item>
          <a-sub-menu v-else :key="`sub-${route.path}`">
            <template #title>
              <span>
                <component :is="route.meta?.icon" />
                {{ route.meta?.title }}
              </span>
            </template>
            <a-menu-item
              v-for="child in route.children"
              :key="`${route.path}/${child.path}`"
            >
              <template #icon>
                <component :is="child.meta?.icon" />
              </template>
              {{ child.meta?.title }}
            </a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        style="padding-left: 20px; display: flex; align-items: center"
      >
        <icon-menu-unfold
          style="cursor: pointer"
          size="24"
          @click="onCollapse"
          v-if="collapsed"
        />
        <icon-menu-fold
          style="cursor: pointer"
          size="24"
          @click="onCollapse"
          v-else
        />
        <a-breadcrumb :style="{ margin: '16px 0' }">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <Header />
      </a-layout-header>
      <a-layout style="padding: 10px">
        <a-layout-content>
          <router-view />
        </a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup>
import { ref, computed } from "vue";
import { Message } from "@arco-design/web-vue";
import { useUserStore, useSiderStore } from "@/store";
import Header from "./Header.vue";
import { useRouter } from "vue-router";
const collapsed = ref(false);
const onCollapse = () => {
  collapsed.value = !collapsed.value;
};

//获取pinia信息
const userStore = useUserStore();
//获取sider信息
const siderStore = useSiderStore();
const userInfo = computed(() => userStore.userInfo);

//拿到路由信息
const router = useRouter();
//过滤掉登录页和首页
const routes = router
  .getRoutes()
  .filter((route) => route.path !== "/")
  .filter((route) => !route.meta.noCha);

const toPath = (path) => {
  //paty要传给siderPath
  siderStore.siderPath = path;
  router.push(path);
  
};
</script>
<style scoped>
.layout {
  height: 100%;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
  box-sizing: border-box;
}
.layout :deep(.arco-layout-sider) .logo {
  height: 32px;
  margin: 12px 8px;
  background: rgba(255, 255, 255, 0.2);
}
.layout :deep(.arco-layout-sider-light) .logo {
  background: var(--color-fill-2);
}
.layout :deep(.arco-layout-header) {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
}
.layout :deep(.arco-layout-footer) {
  color: var(--color-text-2);
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
}
.layout :deep(.arco-layout-content) {
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  background: var(--color-bg-3);
  padding: 20px;
}
.layout :deep(.arco-layout-footer),
.layout :deep(.arco-layout-content) {
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
  color: var(--color-black);
  font-size: 16px;
  /* font-stretch: condensed;
  text-align: center; */
}
</style>
