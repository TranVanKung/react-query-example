import styled from "styled-components";

const HomePageWrapper = styled.div`
  font-size: 1.6rem;
  display: flex;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;

  .background {
    flex-basis: 50%;
    background-color: var(--color-background);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main {
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 6vw;

    .heading {
      color: var(--color-primary);
      font-size: 3rem;
      font-weight: 600;
      width: 80%;
      text-align: center;
    }

    .desc {
      margin-top: 4rem;
      font-size: 1.7rem;
    }

    .list-user-type {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-top: 3rem;
      margin-bottom: 1rem;
    }

    .sign-up {
      margin-top: 3rem;
      font-weight: 500;

      & > span {
        text-decoration: underline;
        color: var(--color-primary);
        cursor: pointer;
      }
    }
  }
`;

export { HomePageWrapper };
