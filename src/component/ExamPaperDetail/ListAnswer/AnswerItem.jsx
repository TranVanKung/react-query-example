import { ALPHABET } from "@/util/config";
import { AnswerItemWrapper, AnswerOptionWrapper } from "./style";

const AnswerItem = (props) => {
  const { index, question } = props;

  return (
    <AnswerItemWrapper>
      <div className="question-number">{index + 1}</div>

      <div className="list">
        {Object.keys(question?.answers).map((key, index) => (
          <AnswerOption
            value={ALPHABET[index]}
            active={question?.true_answer.split(",").includes(key)}
          />
        ))}
      </div>
    </AnswerItemWrapper>
  );
};

const AnswerOption = (props) => {
  const { value, active } = props;

  return (
    <AnswerOptionWrapper active={active}>
      <span className="content">{value}</span>
    </AnswerOptionWrapper>
  );
};

export default AnswerItem;
