import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import { startProgress, closeProgress } from "@/utils/progress";
import Layout from "@/components/Layout"; // 路径根据你实际情况调整

const routes = [
  {
    path: "/",
    component: () => import("@/views/login"),
  },
  // {
  //   path: "/home",
  //   component: () => import("@/views/home"),
  // },
];
const permissionRoutes = [
  {
    path: "/home",
    component: Layout, // 使用 Layout 作为布局
    children: [
      {
        path: "", // 默认子路由
        meta: {
          icon: "icon-tiktok-color",
          title: "我是第一个菜单",
        },
        component: () => import("@/views/home"),
      },
    ],
  },
  {
    path: "/la",
    component: Layout,
    meta: {
      icon: "icon-xigua-color",
      title: "我是第二个菜单",
    },
    children: [
      {
        path: "la",
        meta: {
          title: "我是第二个第二级菜单",
          noCha: true,
        },
        component: () => import("@/views/page/la"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...permissionRoutes, ...routes],
});

// 路由守卫
router.beforeEach((to, from, next) => {
  startProgress();
  const userStore = useUserStore();
  const token = userStore.token;

  // 如果没有token且不是去登录页，跳转到登录页
  if (!token && to.path !== "/") {
    next("/");
  }
  // 如果有token且要去登录页，跳转到首页
  else if (token && to.path === "/") {
    // 使用 replace 而不是 push，这样不会在历史记录中留下登录页的记录
    next({ path: "/home", replace: true });
  }
  // 其他情况正常放行
  else {
    next();
  }
});
router.afterEach(() => {
  closeProgress();
});

export { router };
