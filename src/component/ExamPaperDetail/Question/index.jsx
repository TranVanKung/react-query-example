import { Checkbox, Space } from "antd";
import { ALPHABET } from "@/util/config";
import { QuestionWrapper, AnswerWrapper } from "./style";

const listAnswer = [
  "Đây là câu trả lời đúng",
  "Đây là câu trả lời đúng",
  "Đây là câu trả lời đúng",
  "Đây là câu trả lời đúng",
];

const Question = (props) => {
  const { index, question } = props;

  const onRenderAnswer = () =>
    Object.keys(question?.answers).map((key, index) => (
      <Checkbox value={index} key={index}>
        <AnswerWrapper>
          <div className="label">{ALPHABET[index]}</div>

          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: question?.answers[key] }}
          />
        </AnswerWrapper>
      </Checkbox>
    ));

  return (
    <QuestionWrapper isAnswered={Boolean(question.true_answer)}>
      <div className="question">
        <div className="label">
          <span>{index + 1} </span>
        </div>

        <span dangerouslySetInnerHTML={{ __html: question?.question_detail }} />
      </div>

      <Checkbox.Group
        value={question.true_answer.split(",").map((item) => +item)}
      >
        <Space direction="vertical">{onRenderAnswer()}</Space>
      </Checkbox.Group>
    </QuestionWrapper>
  );
};

export default Question;
