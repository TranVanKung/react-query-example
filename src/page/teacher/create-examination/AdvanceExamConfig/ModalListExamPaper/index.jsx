import { useState, useEffect } from "react";
import { Modal, Button, Row } from "antd";
import { connect } from "react-redux";
import { actSetModalExamPaperOpen } from "@/redux/action/teacher/examination";
import ListExamPaper from "../ListExamPaper";

const ModalStudent = (props) => {
  const {
    isModalExamPaperOpen,
    selectedExamPaper,
    onSetExamPaperInRoom,
    setSelectedExamPaperIndex,
    setSelectedExamPaper,
  } = props;
  const [examPaper, setExamPaper] = useState(null);

  console.log("selectedExamPaper", selectedExamPaper);

  useEffect(() => {
    setExamPaper(selectedExamPaper);
  }, [selectedExamPaper, isModalExamPaperOpen]);

  const onCloseModal = () => {
    props.actSetModalExamPaperOpen(false);
    examPaper && setExamPaper(null);
  };

  const onSaveExamPaper = () => {
    onSetExamPaperInRoom(examPaper);
    props.actSetModalExamPaperOpen(false);
  };

  const onAfterCloseModal = () => {
    examPaper && setExamPaper(null);
    selectedExamPaper && setSelectedExamPaper(null);
    setSelectedExamPaperIndex(null);
  };

  return (
    <Modal
      title="Chọn bài thi"
      onCancel={onCloseModal}
      visible={isModalExamPaperOpen}
      afterClose={onAfterCloseModal}
      maskClosable={false}
      width="70rem"
      style={{ top: "1rem" }}
      footer={
        <div>
          <Row justify="end">
            <Button
              size="large"
              style={{
                marginTop: "1rem",
                borderRadius: "8px",
                marginRight: "1rem",
              }}
              onClick={onCloseModal}
            >
              Huỷ
            </Button>

            <Button
              type="primary"
              className="primary-btn"
              size="large"
              style={{ marginTop: "1rem" }}
              onClick={onSaveExamPaper}
            >
              Lưu
            </Button>
          </Row>
        </div>
      }
    >
      <ListExamPaper examPaper={examPaper} setExamPaper={setExamPaper} />
    </Modal>
  );
};

export default connect(
  (state) => ({
    isModalExamPaperOpen: state.TeacherExamination.isModalExamPaperOpen,
  }),
  {
    actSetModalExamPaperOpen,
  }
)(ModalStudent);
