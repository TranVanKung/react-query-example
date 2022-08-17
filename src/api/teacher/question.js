import { API_METHOD } from "@/util/config";
import { examApi, examFormApi } from "@/api/common";

const examRoomApi = {
  getExamPaperDetail: (examPaperId) =>
    examApi(
      API_METHOD.GET,
      `/exam_service/exam_paper/exam_paper_detail?exam_paper_id=${examPaperId}`
    ),
  createQuestion: (body) =>
    examApi(API_METHOD.POST, "/exam_service/exam_paper/question", body),
  updateQuestion: (body) =>
    examApi(API_METHOD.PUT, "/exam_service/exam_paper/question", body),
  deleteQuestion: ({ id, examPaperId }) =>
    examFormApi(API_METHOD.DELETE, "/exam_service/exam_paper/question", {
      id,
      exam_paper_id: examPaperId,
    }),
};

export default examRoomApi;
