import { API_METHOD } from "@/util/config";
import { examApi, examFormApi } from "@/api/common";

const examRoomApi = {
  getListExamination: ({ skip = 1, limit = 10, name = "", ...rest }) =>
    examApi(
      API_METHOD.GET,
      "/exam_service/examination/list_examination",
      null,
      {
        skip,
        limit,
        name,
        ...rest,
      }
    ),
  getExaminationDetail: (examinationId) =>
    examApi(
      API_METHOD.GET,
      `/exam_service/examination?examination_id=${examinationId}`
    ),
  createExamination: (body) =>
    examApi(API_METHOD.POST, "/exam_service/examination", body),
  updateExamination: (body) =>
    examApi(API_METHOD.PUT, "/exam_service/examination", body),
  deleteExamination: ({ id }) =>
    examFormApi(API_METHOD.DELETE, "/exam_service/examination", { id }),
};

export default examRoomApi;
