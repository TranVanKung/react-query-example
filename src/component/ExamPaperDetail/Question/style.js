import styled from "styled-components";

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2rem;

  &:not(:last-of-type) {
    margin-bottom: 3rem;
  }

  .question {
    margin-bottom: var(--margin-bottom);
    font-size: 1.7rem;
    display: flex;

    p {
      margin: 0;
      font-weight: 500;
    }

    & > .label {
      margin-right: 2rem;
      word-break: unset;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: ${(props) =>
        props?.isAnswered ? "var(--color-success)" : "var(--color-error)"};
      height: 3.5rem;
      width: 3.5rem;
      color: white;
      font-size: 1.8rem;
      font-weight: 700;
      flex-shrink: 0;
      margin-top: 0.7rem;
    }
  }
`;

const AnswerWrapper = styled.div`
  display: flex;

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }

  .label {
    margin-right: 1rem;
    font-weight: 600;
  }

  .content {
    & * {
      font-size: 1.6rem !important;
    }

    & > p {
      margin: 0;
    }
  }
`;

export { QuestionWrapper, AnswerWrapper };
