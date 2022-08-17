import { useMemo } from "react";
import { Checkbox, Row, Tooltip } from "antd";
import { TextEditor, Icon } from "@/component";
import { ALPHABET } from "@/util/config";
import { AnswerItemWrapper } from "./style";

const AnswerItem = (props) => {
  const { listAnswer, setListAnswer, setTrueAnswer, trueAnswer, index } = props;

  const indexInTrueAnswer = useMemo(() => {
    return trueAnswer.indexOf(index);
  }, [trueAnswer, index]);

  const isLastAnswer = useMemo(() => {
    return listAnswer.length - 1 === index;
  }, [listAnswer, index]);

  const isTrueAnswer = useMemo(() => {
    return indexInTrueAnswer !== -1;
  }, [indexInTrueAnswer]);

  const onChangeAnswer = (content) => {
    const tempListAnswer = [...listAnswer];
    tempListAnswer.splice(index, 1, content);
    setListAnswer(tempListAnswer);
  };

  const onRemoveAnswer = () => {
    let tempTrueAnswer = [...trueAnswer];

    tempTrueAnswer = tempTrueAnswer.map((answer, answerIndex) => {
      if (index < answerIndex) {
        return answerIndex - 1;
      } else {
        return answerIndex;
      }
    });

    if (isTrueAnswer) {
      tempTrueAnswer.splice(indexInTrueAnswer, 1);
    }

    setTrueAnswer(tempTrueAnswer);

    const tempListAnswer = [...listAnswer];
    tempListAnswer.splice(index, 1);

    setListAnswer(tempListAnswer);
  };

  const onToggleTrueAnswer = (event) => {
    const { checked } = event.target;

    if (checked) {
      if (!trueAnswer.includes(index)) {
        setTrueAnswer([...trueAnswer, index]);
      }
    } else {
      const tempTrueAnswer = [...trueAnswer];

      if (isTrueAnswer) {
        tempTrueAnswer.splice(indexInTrueAnswer, 1);
        setTrueAnswer(tempTrueAnswer);
      }
    }
  };

  return (
    <AnswerItemWrapper isLastAnswer={isLastAnswer}>
      <Row
        justify="space-between"
        style={{ marginBottom: "1rem", alignItems: "center" }}
      >
        <span style={{ display: "flex" }}>
          <span
            className="label"
            style={{
              backgroundColor: isTrueAnswer
                ? "var(--color-success)"
                : "var(--color-primary)",
            }}
          >
            <span>{ALPHABET[index]}</span>
          </span>

          <Checkbox
            style={{ marginBottom: "1rem", fontSize: "1.6rem" }}
            onChange={onToggleTrueAnswer}
            checked={isTrueAnswer}
          >
            Đây là câu trả lời đúng
          </Checkbox>
        </span>

        <Tooltip title="Xoá" placement="top">
          <span onClick={onRemoveAnswer}>
            <Icon
              name="delete"
              style={{ color: "var(--color-error)", cursor: "pointer" }}
            />
          </span>
        </Tooltip>
      </Row>

      <TextEditor onChange={onChangeAnswer} content={listAnswer[index]} />
    </AnswerItemWrapper>
  );
};

export default AnswerItem;
