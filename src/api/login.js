import request from "@/utils/request";

// 登录
export const login = (data) => request.post("/login", data);

// 获取验证码
export const captchaImage = () => request.get("/captchaImage");

// 获取用户信息
export const getInfo = () => request.get("/getInfo");

// 退出登录
export const logout = () => request.post("/logout");

