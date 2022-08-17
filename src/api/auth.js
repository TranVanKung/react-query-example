import { API_METHOD } from "@/util/config";
import { userFormApi, userApi } from "./common";

const authApi = {
  createAdminAccount: (body) =>
    userApi(API_METHOD.POST, "/user_service/customer", body),
  logIn: (body) =>
    userFormApi(API_METHOD.POST, "/user_service/user/login", body),
  getUserInfo: (accessToken) =>
    userApi(API_METHOD.GET, "/user_service/user/me", null, null, accessToken),
  getLoginCode: (body) =>
    userApi(API_METHOD.POST, "/user_service/magic_link/request", body),
  getAccessToken: (body) =>
    userApi(API_METHOD.POST, "/user_service/magic_link/verify_token", body),
};

export default authApi;
