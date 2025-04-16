<template>
    <div>
     <a-button type="primary" @click="handleLogout">退出</a-button>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from "vue-router";
  import { useUserStore } from "@/store/modules/user";
  const router = useRouter();
  const userStore = useUserStore();
  
  const handleLogout = () => {
    userStore.LogOut();
    router.push("/");
  };
  </script>
  