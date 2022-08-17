import styled from "styled-components";

const ManageQuestionPageWrapper = styled.div`
  background-color: white;
  width: 100%;
  font-size: 1.6rem;
  border-radius: var(--border-radius);
  padding: var(--padding-page);
  flex: 1 1 auto;

  & > .heading {
    margin-bottom: var(--margin-bottom);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;

    .extras {
      margin-left: auto;
      display: flex;
      align-items: center;
      align-self: center;
    }
  }

  .summary {
    display: flex;
    margin-right: auto;
    margin-bottom: var(--margin-bottom-large);

    .item {
      display: flex;
      align-items: center;
      margin-right: 1.5rem;

      .icon {
        display: flex;
        justify-content: center;
        align-items: center;

        .material-icons-outlined {
          font-size: 2.2rem;
          color: var(--color-text-secondary);
        }
      }

      .label {
        margin-left: 1rem;
        font-size: 1.4rem;
        font-weight: 600;
        color: var(--color-text-secondary);
      }
    }
  }
`;

const DropItemWrapper = styled.div`
  display: flex;
  align-items: center;

  .label {
    margin-left: 1rem;
  }
`;

export { ManageQuestionPageWrapper, DropItemWrapper };
