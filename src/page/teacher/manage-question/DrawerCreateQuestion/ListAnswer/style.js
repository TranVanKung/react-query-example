import styled from "styled-components";

const ListAnswerWrapper = styled.div`
  height: 100%;
  background-color: white;
  border-radius: var(--border-radius);
  padding: var(--padding-page);

  .heading {
    font-size: 1.6rem;
    font-weight: 500;
  }

  & > .empty {
    margin-top: var(--margin-top);
    border: 2px dashed var(--color-border);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 4rem 0;
    border-radius: var(--border-radius);

    img {
      height: 7rem;
    }

    .text {
      font-size: 1.7rem;
      margin-top: var(--margin-top);
      color: var(--color-text-secondary);
      font-style: italic;
    }
  }

  & > .add-answer {
    display: flex;
    justify-content: center;
    margin-top: var(--margin-top);

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem;
      border-radius: 50%;
      border: 2px dashed var(--color-primary);
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-color: var(--color-border);
      }
    }
  }
`;

const AnswerItemWrapper = styled.div`
  border-bottom: 1px solid
    ${(props) => (props?.isLastAnswer ? "transparent" : "var(--color-border)")};
  padding: 2rem 0;

  .label {
    background-color: var(--color-primary);
    margin-right: 1.5rem;
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

export { ListAnswerWrapper, AnswerItemWrapper };
