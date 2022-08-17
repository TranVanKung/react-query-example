import styled from "styled-components";

const DrawerHeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 94vw;

  .title {
    font-weight: 600;
    font-size: 1.9rem;
  }

  .summary {
    display: flex;
    align-items: center;

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
        font-size: 1.6rem;
        font-weight: 600;
        color: var(--color-text-secondary);
      }
    }
  }
`;

const DrawerContentWrapper = styled.div`
  background-color: var(--color-background);
  padding: var(--padding-page);
`;

export { DrawerHeadingWrapper, DrawerContentWrapper };
