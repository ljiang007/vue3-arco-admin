import axios from "axios";
import Cookies from "js-cookie";
import { Message } from "@arco-design/web-vue";

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000, // 请求超时时间
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("1", error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200) {
      Message.error(res.msg || '请求失败');
      return res
    } else {
      return res;
    }
  },
  (error) => {
    console.log("接口信息报错2" + error);
    return Promise.reject(error);
  }
);

export default service;
