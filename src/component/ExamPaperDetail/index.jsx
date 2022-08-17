import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";
import { CardHeading } from "@/component";
import { ExamPaperDetailWrapper } from "./style";
import ListAnswer from "./ListAnswer";
import Question from "./Question";

const ExamPaperDetail = (props) => {
  const { isPreviewing, listQuestion } = props;

  const onRenderQuestion = () =>
    listQuestion.map((question, index) => (
      <Question key={index} index={+index} question={question} />
    ));

  return (
    <ExamPaperDetailWrapper>
      <div className="list-question">
        <Scrollbars style={{ height: "100%" }}>
          {!isPreviewing ? (
            <div className="title">Đề toán 1 chi tiết</div>
          ) : null}

          {onRenderQuestion()}
        </Scrollbars>
      </div>

      <div className="list-answer">
        <div className="heading">
          <CardHeading style={{ flexBasis: "20%" }}>Câu</CardHeading>
          <CardHeading>Chọn đáp án</CardHeading>
        </div>

        <ListAnswer />
      </div>
    </ExamPaperDetailWrapper>
  );
};

export default connect((state) => ({
  listQuestion: state.TeacherQuestion.listQuestion,
}))(ExamPaperDetail);
