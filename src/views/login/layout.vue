<template>
  <div class="login-layout">
    <a-card
      :style="{ width: '400px' }"
      title="登录"
      :body-style="{ textAlign: 'center' }"
    >
      <template #extra>
        <a-link>更多</a-link>
      </template>
      <a-form :model="form" @submit="handleSubmit">
        <a-form-item
          :rules="[
            { required: true, message: '用户名不能为空' },
            { minLength: 2, message: '用户名长度不能少于2个字符' },
            { maxLength: 20, message: '用户名长度不能超过20个字符' },
          ]"
          field="username"
          label="用户名"
        >
          <a-input v-model="form.username" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item
          :rules="[{ required: true, message: '密码不能为空' }]"
          field="password"
          label="密码"
        >
          <a-input v-model="form.password" placeholder="请输入密码" />
        </a-form-item>
        <a-form-item
          label="验证码"
          :rules="[{ required: true, message: '验证码不能为空' }]"
          field="code"
        >
          <a-input v-model="form.code" placeholder="请输入验证码" />
          <a-image
            style="margin-left: 10px"
            :src="img"
            width="100"
            height="30"
          />
        </a-form-item>
        <a-form-item>
          <a-button :loading="loading" html-type="submit" type="primary"
            >登录</a-button
          >
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup>
import { captchaImage } from "@/api/login";
import { ref, reactive, onBeforeMount, defineExpose } from "vue";
import { encrypt } from "@/utils/jsencrypt";

const emit = defineEmits(["submit"]);
const loading = ref(false);
const img = ref("");
const form = reactive({
  username: "",
  password: "",
  code: "",
  uuid: "",
});

onBeforeMount(() => {
  getCode();
});

const getCode = async () => {
  const { data } = await captchaImage();
  form.uuid = data.uuid;
  img.value = `data:image/png;base64,${data.img}`;
};

const handleSubmit = async ({ values, errors }) => {
  const isEmpty = Object.values(values).every((value) => value !== "");
  if (!isEmpty) {
    return;
  }
  try {
    loading.value = true;
    const data = { ...values };
    await emit("submit", data);
  } finally {
    loading.value = false;
  }
};
defineExpose({
  getCode,
});
</script>

<style scoped>
.login-layout {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-right: 100px;
}
.arco-card-body {
  text-align: center !important;
}
</style>
