import { API_METHOD } from "@/util/config";
import { examApi, examFormApi } from "@/api/common";

const protorApi = {
  getListProtor: ({ skip = 1, limit = 10, name = "", ...rest }) =>
    examApi(
      API_METHOD.GET,
      "/exam_service/examination/protor/list_protor",
      null,
      {
        skip,
        limit,
        name,
        ...rest,
      }
    ),
  createProtor: (body) =>
    examApi(API_METHOD.POST, "/exam_service/examination/protor", body),
  updateProtor: (body) =>
    examApi(API_METHOD.PUT, "/exam_service/examination/protor", body),
  deleteProtor: ({ id }) =>
    examFormApi(API_METHOD.DELETE, "/exam_service/examination/protor", {
      id,
    }),
};

export default protorApi;
