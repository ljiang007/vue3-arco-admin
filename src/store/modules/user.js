import { defineStore } from "pinia";
import Cookies from "js-cookie";
import { login, getInfo, logout } from "@/api/login";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: Cookies.get("token") || "",
    userInfo: null,
  }),
  actions: {
    async Login(loginInfo) {
      try {
        const res = await login(loginInfo);
        if (res.data && res.data.token) {
          Cookies.set("token", res.data.token);
          this.token = res.data.token;
        }
        return res;
      } catch (error) {
        throw error;
      }
    },
    async Info(loginInfo) {
      try {
        const res = await getInfo(loginInfo);
        this.userInfo = res.data;
        return res;
      } catch (error) {
        throw error;
      }
    },
    async LogOut() {
      try {
        const res = await logout();
        this.token = "";
        this.userInfo = null;
        Cookies.remove("token");
        return res;
      } catch (error) {
        throw error;
      }
    },
  },
});
