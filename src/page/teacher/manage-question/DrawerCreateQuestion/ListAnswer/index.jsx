import { useState } from "react";
import { Row, Button, Tooltip, Alert, message } from "antd";
import { connect } from "react-redux";
import { useMutation } from "react-query";
import _ from "lodash";
import { Icon } from "@/component";
import emptyImg from "@/asset/empty.png";
import { ALPHABET } from "@/util/config";
import {
  actSetDrawerQuestionVisible,
  actSaveCreateQuestion,
  actSaveUpdateQuestion,
} from "@/redux/action/teacher/question";
import questionApi from "@/api/teacher/question";
import { ListAnswerWrapper } from "./style";
import AnswerItem from "./AnswerItem";

const ListAnswer = (props) => {
  const {
    listAnswer,
    setListAnswer,
    setTrueAnswer,
    trueAnswer,
    question,
    examPaperId,
    selectedQuestion,
  } = props;

  const [errorMsg, setErrorMsg] = useState(null);

  const { mutate: actCreateQuestion } = useMutation(
    (body) => questionApi.createQuestion(body),
    {
      onSuccess: (res) => {
        if (res?.data) {
          props.actSaveCreateQuestion(res?.data);
          onCloseDrawer();
          message.success("Tạo mới câu hỏi thành công");
        } else if (res?.error) {
          setErrorMsg(res?.error);
        }
      },
    }
  );

  const { mutate: actUpdateQuestion } = useMutation(
    (body) => questionApi.updateQuestion(body),
    {
      onSuccess: (res) => {
        if (res?.data) {
          props.actSaveUpdateQuestion(res?.data);
          onCloseDrawer();
          message.success("Cập nhật câu hỏi thành công");
        } else if (res?.error) {
          setErrorMsg(res?.error);
        }
      },
    }
  );

  const renderListAnswer = () =>
    listAnswer.map((item, index) => (
      <AnswerItem
        key={index}
        index={index}
        listAnswer={listAnswer}
        setListAnswer={setListAnswer}
        setTrueAnswer={setTrueAnswer}
        trueAnswer={trueAnswer}
      />
    ));

  const onCloseDrawer = () => {
    props.actSetDrawerQuestionVisible(false);
  };

  const onCreateNewAnswer = () => {
    setListAnswer([...listAnswer, ""]);
  };

  const onCreateQuestion = () => {
    const answers = {};
    const indexOfEmtpyAnswer = [];

    listAnswer.forEach((answer, index) => {
      answers[index] = answer;

      if (!answer || answer.trim().substring(0, 8) === "<p></p>") {
        indexOfEmtpyAnswer.push(index);
      }
    });

    const reqBody = {
      exam_paper_id: examPaperId,
      question_detail: question,
      true_answer: trueAnswer.join(","),
      answers,
    };

    if (reqBody?.true_answer === "") {
      setErrorMsg("Cần chọn ít nhất một đáp án đúng");
    } else if (reqBody?.answers.length === 0) {
      setErrorMsg("Cần tạo ít nhất một câu trả lời");
    } else if (indexOfEmtpyAnswer.length > 0) {
      setErrorMsg(
        `Nội dung trả lời ${indexOfEmtpyAnswer
          .map((item) => {
            return ALPHABET[item];
          })
          .join(", ")} không được để trống`
      );
    } else {
      errorMsg && setErrorMsg(null);

      if (_.isEmpty(selectedQuestion)) {
        actCreateQuestion(reqBody);
      } else {
        actUpdateQuestion({
          ...selectedQuestion,
          ...reqBody,
        });
      }
    }
  };

  return (
    <ListAnswerWrapper>
      <div className="heading">Danh sách đáp án:</div>

      {errorMsg ? (
        <Alert
          message="Thông báo!"
          description={errorMsg}
          type="error"
          style={{
            marginTop: "var(--margin-top)",
          }}
        />
      ) : null}

      {listAnswer.length === 0 ? (
        <div className="empty">
          <img src={emptyImg} alt="" />
          <div className="text">Hãy tạo ít nhất một đáp án</div>
        </div>
      ) : null}

      {renderListAnswer()}

      <div className="add-answer">
        <Tooltip title="Thêm đáp án" placement="top">
          <div className="icon" onClick={onCreateNewAnswer}>
            <Icon
              name="add"
              style={{ color: "var(--color-primary)", fontSize: "2.2rem" }}
            />
          </div>
        </Tooltip>
      </div>

      <Row justify="end" style={{ marginTop: "1.5rem" }}>
        <Button
          danger
          className="delete-btn"
          size="large"
          style={{ marginRight: "1.5rem" }}
          onClick={onCloseDrawer}
        >
          Huỷ
        </Button>

        <Button
          type="primary"
          className="primary-btn"
          size="large"
          onClick={onCreateQuestion}
        >
          {_.isEmpty(selectedQuestion) ? "Tạo mới" : "Cập nhật"}
        </Button>
      </Row>
    </ListAnswerWrapper>
  );
};

export default connect(
  (state) => ({
    selectedQuestion: state.TeacherQuestion.selectedQuestion,
  }),
  {
    actSetDrawerQuestionVisible,
    actSaveCreateQuestion,
    actSaveUpdateQuestion,
  }
)(ListAnswer);
