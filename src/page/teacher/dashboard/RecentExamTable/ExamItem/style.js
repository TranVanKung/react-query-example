import styled from "styled-components";

const ExamItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: 1.2rem 1.5rem;

  &:not(:last-of-type) {
    margin-bottom: 2rem;
  }

  .status {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    content: "";
  }

  .test-info {
    .name {
      font-weight: 500;
      font-size: 1.5rem;
      color: var(--color-text);
    }

    .other-info {
      display: flex;
      justify-content: space-between;

      & > div {
        display: flex;
        align-items: center;

        &:not(:last-of-type) {
          margin-right: 1.5rem;
        }

        img {
          margin-right: 0.5rem;
        }

        span {
          font-size: 1.3rem;
          color: var(--color-text-secondary);
        }
      }
    }
  }
`;

export { ExamItemWrapper };
