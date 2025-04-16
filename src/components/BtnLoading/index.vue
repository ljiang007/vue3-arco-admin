<!-- 带有loading的按钮 -->
<template>
  <a-button :type="type" :loading="loading" @click="handleClick">
    {{ text }}
  </a-button>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  type: {
    type: String,
    default: "primary",
  },
  text: {
    type: String,
    required: true, // 必填
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
const loading = ref(false);
const emit = defineEmits(["click"]);
const handleClick = () => {
  emit("click", loading);
};
</script>
