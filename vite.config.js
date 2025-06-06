import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  
  return {
    //基本路径
    base: "/",
    plugins: [vue()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
      extensions: [".vue", ".js", ".json"],
      mainFiles: ["index"],
    },
    //服务
    server: {
      //端口号
      port: 8080,
      //是否自动打开浏览器
      open: true,
      //主机名
      host: "0.0.0.0",
      //是否开启CORS跨域
      cors: true,
      //自定义代理规则
      proxy: {
        [env.VITE_BASE_API]: {
          target: "http://localhost:8020",
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp("^" + env.VITE_BASE_API), ""),
        },
      },
    },
    //构建
    build: {
      // 设置最终构建的浏览器兼容目标
      target: "es2015",
      // 构建后是否生成 source map 文件
      sourcemap: false,
      //  chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 2000,
      // 启用/禁用 gzip 压缩大小报告
      reportCompressedSize: false,
    },
  };
});
