import styled, { css } from "styled-components";

const ExamPaperItemWrapper = styled.div`
  padding: 1.5rem 2rem;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  background-color: var(--background-error);
  cursor: pointer;

  &:not(:last-of-type) {
    margin-bottom: var(--margin-bottom);
  }

  ${(props) =>
    props.active
      ? css`
          border: 1px dashed var(--color-primary);
        `
      : css`
          border: 1px dashed transparent;
        `}

  .check {
    width: 1.7rem;
    height: 1.4rem;
    content: "";
    border-radius: 50%;
    position: relative;
    margin-right: var(--margin-right);

    ${(props) =>
      props.active
        ? css`
            background-color: var(--color-success);

            &::after {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              border-radius: 50%;
              background-color: var(--background-success);
              transform: scale(1.7);
            }
          `
        : css`
            border: 2px solid var(--color-primary);
          `}
  }

  & > .icon {
    margin-right: 3rem;
  }

  .test-detail {
    display: flex;
    flex-direction: column;
    width: 100%;

    .info {
      display: flex;
      margin-bottom: 1.5rem;

      .name {
        font-size: 1.5rem;
        font-weight: 600;
        margin-right: auto;
      }

      .type {
        margin-left: 2rem;
        font-size: 1.3rem;
        background-color: var(--background-primary);
        border-radius: var(--border-radius-1);
        padding: 0.2rem 1.5rem;
        color: white;
        font-weight: 500;
      }
    }

    & > .summary {
      display: flex;
      align-items: center;
      justify-content: space-between;

      & > .item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-basis: 25%;

        &:not(:last-of-type) {
          margin-right: 0.5rem;
        }

        .icon {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 0.5rem;

          .material-icons-outlined {
            font-size: 2.2rem;
            color: var(--color-primary-light);
          }
        }

        & > .label {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--color-text-secondary);
          width: 100%;
        }
      }
    }
  }
`;

export { ExamPaperItemWrapper };
