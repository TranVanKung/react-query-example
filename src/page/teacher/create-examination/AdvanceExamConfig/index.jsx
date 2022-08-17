import { useState } from "react";
import { connect } from "react-redux";
import classroomImg from "@/asset/classroom.png";
import { actSetListExamRoom } from "@/redux/action/teacher/examination";
import ScheduleRoomItem from "./ScheduleRoomItem";
import ModalListExamPaper from "./ModalListExamPaper";
import { AdvanceExamConfigWrapper, CreateExamRoomWrapper } from "./style";

const AdvanceExamConfig = (props) => {
  const { listScheduleRoom } = props;
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [selectedExamPaper, setSelectedExamPaper] = useState(null);
  const [selectedExamPaperIndex, setSelectedExamPaperIndex] = useState(null);

  const renderFirstColumn = () =>
    listScheduleRoom
      .filter((item, index) => index % 2 === 0)
      .map((item, index) => (
        <ScheduleRoomItem
          key={index}
          onDeleteRoom={onDeleteRoom}
          onUpdateRoom={onUpdateRoom}
          index={index * 2}
          setSelectedRoomIndex={setSelectedRoomIndex}
          setSelectedExamPaper={setSelectedExamPaper}
          setSelectedExamPaperIndex={setSelectedExamPaperIndex}
        />
      ));

  const renderSecondColumn = () =>
    listScheduleRoom
      .filter((item, index) => index % 2 !== 0)
      .map((item, index) => (
        <ScheduleRoomItem
          key={index}
          onDeleteRoom={onDeleteRoom}
          onUpdateRoom={onUpdateRoom}
          index={(index + 1) * 2 - 1}
          setSelectedRoomIndex={setSelectedRoomIndex}
          setSelectedExamPaper={setSelectedExamPaper}
          setSelectedExamPaperIndex={setSelectedExamPaperIndex}
        />
      ));

  const onCreateExamRoom = () => {
    props.actSetListExamRoom([
      ...listScheduleRoom,
      {
        list_exam_papers: [],
        exam_room: null,
        start_time: null,
        protors: null,
      },
    ]);
  };

  const onDeleteRoom = (index) => {
    const tempListRoom = [...listScheduleRoom];
    tempListRoom.splice(index, 1);
    props.actSetListExamRoom([...tempListRoom]);
  };

  const onUpdateRoom = (index, roomConfig) => {
    const tempListRoom = [...listScheduleRoom];
    tempListRoom.splice(index, 1, roomConfig);
    props.actSetListExamRoom([...tempListRoom]);
  };

  const onSetExamPaperInRoom = (examPaper) => {
    const tempListRoom = [...listScheduleRoom];
    let roomConfig = tempListRoom[selectedRoomIndex];
    const listExamPaper = roomConfig?.list_exam_papers || [];
    listExamPaper[selectedExamPaperIndex || listExamPaper.length] = examPaper;

    roomConfig = {
      ...roomConfig,
      list_exam_papers: listExamPaper,
    };
    tempListRoom[selectedRoomIndex] = roomConfig;
    props.actSetListExamRoom([...tempListRoom]);
  };

  return (
    <AdvanceExamConfigWrapper>
      <div className="column" style={{ marginRight: "auto" }}>
        {renderFirstColumn()}

        {listScheduleRoom?.length % 2 === 0 ? (
          <CreateExamRoom onClick={onCreateExamRoom} />
        ) : null}
      </div>

      <div className="column">
        {renderSecondColumn()}

        {listScheduleRoom?.length % 2 !== 0 ? (
          <CreateExamRoom onClick={onCreateExamRoom} />
        ) : null}
      </div>

      <ModalListExamPaper
        selectedRoomIndex={selectedRoomIndex}
        selectedExamPaperIndex={selectedExamPaperIndex}
        selectedExamPaper={selectedExamPaper}
        onSetExamPaperInRoom={onSetExamPaperInRoom}
        setSelectedExamPaperIndex={setSelectedExamPaperIndex}
        setSelectedExamPaper={setSelectedExamPaper}
      />
    </AdvanceExamConfigWrapper>
  );
};

const CreateExamRoom = (props) => {
  const { onClick } = props;

  return (
    <CreateExamRoomWrapper onClick={onClick}>
      <img src={classroomImg} alt="" />
      <div className="text">Tạo mới lớp thi</div>
    </CreateExamRoomWrapper>
  );
};

export default connect(
  (state) => ({
    listScheduleRoom:
      state?.TeacherExamination?.selectedExamination?.scheduled_exam_rooms ||
      [],
  }),
  { actSetListExamRoom }
)(AdvanceExamConfig);
