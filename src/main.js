import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import { router } from "./router";
import BtnLoading from "./components/BtnLoading";

// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';
import store from "@/store";

const app = createApp(App);
app.component("LiBtnLoading", BtnLoading);

app.use(ArcoVueIcon);
app.use(store);
app.use(ArcoVue);
app.use(router);
app.mount("#app");
