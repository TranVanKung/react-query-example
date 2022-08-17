import { API_METHOD } from "@/util/config";
import { userFormApi, userApi } from "@/api/common";

const teacherApi = {
  getListTeacher: ({ skip = 1, limit = 10 }) =>
    userApi(API_METHOD.GET, "/user_service/customer/list_teacher", null, {
      skip,
      limit,
    }),
  createTeacher: (body) =>
    userApi(API_METHOD.POST, "/user_service/customer/create_teacher", body),
  updateTeacher: (body) =>
    userApi(API_METHOD.PUT, "/user_service/customer/user", body),
  deleteTeacher: ({ id }) =>
    userFormApi(API_METHOD.DELETE, "/user_service/customer/user", { id }),
};

export default teacherApi;
