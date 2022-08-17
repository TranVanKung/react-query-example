import { API_METHOD } from "@/util/config";
import { examApi, examFormApi } from "@/api/common";

const examRoomApi = {
  getListExamRoom: ({ skip = 1, limit = 10, query_name = "", ...rest }) =>
    examApi(API_METHOD.GET, "/exam_service/exam_room/list_exam_room", null, {
      skip,
      limit,
      query_name,
      ...rest,
    }),
  getExamRoomDetail: (roomId) =>
    examApi(API_METHOD.GET, `/exam_service/exam_room?exam_room_id=${roomId}`),
  createExamRoom: (body) =>
    examApi(API_METHOD.POST, "/exam_service/exam_room", body),
  updateExamRoom: (body) =>
    examApi(API_METHOD.PUT, "/exam_service/exam_room", body),
  deleteExamRoom: ({ id }) =>
    examFormApi(API_METHOD.DELETE, "/exam_service/exam_room", { id }),
};

export default examRoomApi;
