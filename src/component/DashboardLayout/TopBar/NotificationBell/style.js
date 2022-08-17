import styled from "styled-components";

const NotificationBellWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;

    .material-icons-outlined {
      font-size: 2.5rem;
      color: var(--color-text);
    }
  }
`;

const NotificationListWrapper = styled.div`
  background-color: white;
  box-shadow: var(--box-shadow);
  width: 35rem;
  border: 1px solid var(--color-border);

  .heading {
    padding: 1.5rem 1.5rem;
    display: flex;
    justify-content: space-between;

    & > .text {
      color: var(--color-text);
      font-weight: 500;
      font-size: 1.5rem;
    }

    .view-all {
      display: flex;
      align-items: center;
      color: var(--color-text);
      cursor: pointer;

      &:hover {
        .text {
          text-decoration: underline;
        }
      }

      .text {
        margin-right: 0.2rem;
        font-size: 1.3rem;
        font-weight: 500;
      }

      .icon {
        display: flex;
        align-items: center;
        margin-left: 0.5rem;

        .material-icons-outlined {
          font-size: 1.9rem;
        }
      }
    }
  }
`;

const NotificationItemWrapper = styled.div`
  padding: 1rem 1.5rem 0.5rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:not(:last-of-type) {
    border-bottom: 1px solid var(--color-border);
  }

  .date {
    display: flex;
    align-items: center;
    font-family: var(--text-font);
    font-size: 1.4rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colorTextSecondary};
    margin-bottom: 0.5rem;

    .dot {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background: ${(props) =>
        props.isNew ? "var(--background-success)" : "var(--background-error)"};
      margin-right: 0.7rem;
    }
  }

  .title {
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 0.2rem;
  }

  .message {
    font-style: italic;
    font-size: 1.4rem;
    color: var(--color-text);
    font-weight: 300;
  }
`;

export {
  NotificationBellWrapper,
  NotificationListWrapper,
  NotificationItemWrapper,
};
