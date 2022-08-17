import styled, { css } from "styled-components";

const ListAnswerWrapper = styled.div``;

const AnswerItemWrapper = styled.div`
  display: flex;

  &:not(:last-of-type) {
    margin-bottom: 2rem;
  }

  .question-number {
    flex-basis: 20%;
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-text-secondary);
  }

  .list {
    flex-grow: 1;
    display: flex;
    justify-content: flex-start;
  }
`;

const AnswerOptionWrapper = styled.div`
  flex-basis: 25%;

  .content {
    border: 1px solid var(--color-primary);
    border-radius: 50%;
    padding: 1rem;
    height: 3rem;
    width: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--color-primary);
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    ${(props) =>
      !props.active &&
      css`
        &:hover {
          background-color: var(--color-primary);
          color: white;
        }
      `};

    ${(props) =>
      props.active &&
      css`
        background: var(--color-success);
        color: white;
        border: 1px solid var(--color-success);
        position: relative;

        &::after {
          position: absolute;
          content: "";
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: var(--background-success);
          transform: scale(1.5);
          border-radius: 50%;
        }
      `};
  }
`;

export { ListAnswerWrapper, AnswerItemWrapper, AnswerOptionWrapper };
