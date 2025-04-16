<template>
  <div class="login-container">
    <LoginLayout ref="loginRef" @submit="handleLogin" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import LoginLayout from "./layout.vue";
import { useRouter } from "vue-router";
import { aesEncrypt } from "@/utils/aes";
import { useUserStore } from "@/store/modules/user";

const router = useRouter();
const loginRef = ref(null);
const userStore = useUserStore();

const handleLogin = async (data) => {
  data.password = aesEncrypt(data.password);
  try {
    const res = await userStore.Login(data);
    if (res.code != 200) {
      loginRef.value.getCode();
      return;
    }
    await userStore.Info();
    router.push("/home");
  } catch (error) {}
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("@/assets/images/login-bg.jpg");
  background-size: 100% 100%;
}
</style>
