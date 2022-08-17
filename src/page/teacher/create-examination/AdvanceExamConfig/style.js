import styled from "styled-components";

const AdvanceExamConfigWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;

  & > .column {
    flex-basis: 48%;
  }
`;

const CreateExamRoomWrapper = styled.div`
  border: 2px dashed var(--color-border);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background-white);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius);
  transition: all 0.1s ease-in-out;
  height: 43.6rem;

  &:hover {
    background-color: var(--color-background-gray);
    border: 2px dashed var(--background-primary);
  }

  img {
    height: 12rem;
  }

  .text {
    margin-top: var(--margin-top);
    font-size: 2.5rem;
    font-weight: 600;
    color: var(--color-text-secondary);
  }

  .material-icons-outlined {
    font-size: 5rem;
    color: var(--color-text-secondary);
  }
`;

export { AdvanceExamConfigWrapper, CreateExamRoomWrapper };
