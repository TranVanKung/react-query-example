import { useEffect, useState } from "react";
import { Drawer } from "antd";
import { connect } from "react-redux";
import _ from "lodash";
import { actSetDrawerQuestionVisible } from "@/redux/action/teacher/question";
import { DrawerCreateQuestionWrapper } from "./style";
import ListAnswer from "./ListAnswer";
import QuestionConfig from "./QuestionConfig";

const DrawerCreateQuestion = (props) => {
  const { isDrawerVisible, selectedQuestion, examPaperId } = props;
  const [question, setQuestion] = useState("");
  const [listAnswer, setListAnswer] = useState([]);
  const [trueAnswer, setTrueAnswer] = useState([]);

  useEffect(() => {
    if (!_.isEmpty(selectedQuestion)) {
      setQuestion(selectedQuestion?.question_detail);

      if (!_.isEmpty(selectedQuestion?.answers)) {
        setListAnswer(Object.values(selectedQuestion?.answers));

        if (selectedQuestion?.true_answer) {
          setTrueAnswer(
            selectedQuestion?.true_answer?.split(",").map((item) => +item)
          );
        }
      }
    } else {
      setQuestion("");
      setListAnswer([]);
      setTrueAnswer([]);
    }
  }, [selectedQuestion]);

  const onCloseDrawer = () => {
    props.actSetDrawerQuestionVisible(false);
  };

  return (
    <Drawer
      visible={isDrawerVisible}
      title={
        _.isEmpty(selectedQuestion) ? "Tạo mới câu hỏi" : "Cập nhật câu hỏi"
      }
      onClose={onCloseDrawer}
      width="100%"
      placement="right"
      className="preview-test-drawer"
    >
      <DrawerCreateQuestionWrapper>
        <div className="question-config">
          <QuestionConfig question={question} setQuestion={setQuestion} />
        </div>

        <div className="list-answer">
          <ListAnswer
            listAnswer={listAnswer}
            setListAnswer={setListAnswer}
            setTrueAnswer={setTrueAnswer}
            trueAnswer={trueAnswer}
            question={question}
            examPaperId={examPaperId}
          />
        </div>
      </DrawerCreateQuestionWrapper>
    </Drawer>
  );
};

export default connect(
  (state) => ({
    isDrawerVisible: state.TeacherQuestion.isDrawerVisible,
    selectedQuestion: state.TeacherQuestion.selectedQuestion,
  }),
  { actSetDrawerQuestionVisible }
)(DrawerCreateQuestion);
