import { API_METHOD } from "@/util/config";
import { examApi, examFormApi } from "@/api/common";

const studentApi = {
  getListStudent: ({ skip = 1, limit = 10, roomId, ...rest }) =>
    examApi(API_METHOD.GET, "/exam_service/exam_room/list_candidate", null, {
      skip,
      limit,
      room_id: roomId,
      ...rest,
    }),
  createStudent: (body) =>
    examApi(API_METHOD.POST, "/exam_service/exam_room/candidate", body),
  updateStudent: (body) =>
    examApi(API_METHOD.PUT, "/exam_service/exam_room/candidate", body),
  deleteStudent: ({ id, exam_room_id }) =>
    examFormApi(API_METHOD.DELETE, "/exam_service/exam_room/candidate", {
      id,
      exam_room_id,
    }),
};

export default studentApi;
