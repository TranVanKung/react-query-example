import { connect } from "react-redux";
import { ListAnswerWrapper } from "./style";
import AnswerItem from "./AnswerItem";

const ListAnswer = (props) => {
  const { listQuestion } = props;

  const renderListAnswer = () =>
    listQuestion.map((question, index) => (
      <AnswerItem key={index} index={index} question={question} />
    ));

  return <ListAnswerWrapper>{renderListAnswer()}</ListAnswerWrapper>;
};

export default connect((state) => ({
  listQuestion: state.TeacherQuestion.listQuestion,
}))(ListAnswer);
