import styled from "styled-components";

const LoginPageWrapper = styled.div`
  font-size: 1.6rem;
  height: 100vh;
  width: 100vw;
  background-image: ${(props) => `url(${props.bgUrl})`};
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > .heading {
    font-size: 3.7rem;
    color: var(--color-text);
    font-weight: 700;
    text-align: center;
    margin-top: -15vh;
  }

  .form {
    margin-top: 4rem;
    width: 40rem;
    background-color: white;
    padding: var(--padding);
    border-radius: var(--border-radius);

    & > .heading {
      font-size: 2.5rem;
      margin-bottom: var(--margin-bottom);
      text-align: center;
      font-weight: 600;
    }

    .navigation {
      margin-bottom: var(--margin-bottom);
      display: flex;

      .back {
        display: flex;
        align-items: center;
        font-size: 1.5rem;
        cursor: pointer;

        .text {
          margin-left: 0.5rem;
        }
      }
    }

    .forget-pwd {
      color: var(--color-success);
      font-weight: 500;
      font-size: 1.5rem;
    }
  }
`;

export { LoginPageWrapper };
