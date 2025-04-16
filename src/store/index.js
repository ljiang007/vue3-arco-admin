import { createPinia } from "pinia";
import { useUserStore } from "./modules/user";
import { useSiderStore } from "./modules/sider";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const store = createPinia();
store.use(piniaPluginPersistedstate);

export default store;

export { useUserStore,useSiderStore };
