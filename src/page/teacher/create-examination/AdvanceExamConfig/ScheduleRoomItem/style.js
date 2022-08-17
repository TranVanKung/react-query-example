import styled from "styled-components";

const ScheduleRoomItemWrapper = styled.div`
  padding: var(--padding-page);
  border-radius: var(--border-radius);
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3rem;

  .heading {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .delete-room {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: var(--margin-bottom);
      cursor: pointer;

      & * {
        transition: all 0.1s ease-in-out;
      }

      .material-icons-outlined {
        color: var(--color-text-secondary);
      }

      &:hover {
        .material-icons-outlined {
          color: var(--color-error);
        }
      }
    }
  }

  .change-exam-paper {
    display: flex;
    justify-content: flex-end;

    & > span {
      cursor: pointer;
      font-style: italic;
      text-decoration: underline;
      font-weight: 500;
      transition: all 0.1s ease-in-out;

      &:hover {
        color: var(--color-primary);
      }
    }
  }
`;

const EmptyExamItemWrapper = styled.div`
  cursor: pointer;
  border-radius: var(--border-radius);
  border: 2px dashed var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--padding-page);
  transition: all 0.1s ease-in-out;
  width: 100%;

  &:hover {
    background-color: var(--color-background-gray);
    border: 2px dashed var(--color-primary-light);
  }

  img {
    height: 5rem;
  }

  .text {
    font-size: 1.7rem;
    font-weight: 400;
    font-style: italic;
    color: var(--color-text-secondary);
    margin-left: var(--margin-left);
  }
`;

export { ScheduleRoomItemWrapper, EmptyExamItemWrapper };
