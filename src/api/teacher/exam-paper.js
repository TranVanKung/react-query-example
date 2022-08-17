import { API_METHOD } from "@/util/config";
import { examApi, examFormApi } from "@/api/common";

const examPaperApi = {
  getListExamPaper: ({ skip = 1, limit = 10, query_name = "", ...rest }) =>
    examApi(API_METHOD.GET, "/exam_service/exam_paper/list_exam_paper", null, {
      skip,
      limit,
      query_name,
      ...rest,
    }),
  getExamPaperDetail: (examPaperId) =>
    examApi(
      API_METHOD.GET,
      `/exam_service/exam_paper/exam_paper_detail?exam_paper_id=${examPaperId}`
    ),
  createExamPaper: (body) =>
    examApi(API_METHOD.POST, "/exam_service/exam_paper", body),
  updateExamPaper: (body) =>
    examApi(API_METHOD.PUT, "/exam_service/exam_paper", body),
  deleteExamPaper: ({ id }) =>
    examFormApi(API_METHOD.DELETE, "/exam_service/exam_paper", { id }),
};

export default examPaperApi;
