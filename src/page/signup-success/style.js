import styled from "styled-components";

const SignupSuccessPageWrapper = styled.div`
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

  .form {
    width: 45rem;
    background-color: white;
    padding: var(--padding);
    border-radius: var(--border-radius);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      height: 26rem;
    }

    .text {
      margin-bottom: 3rem;
      font-weight: 400;
      font-size: 1.8rem;
      text-align: center;
      margin-top: 1rem;
    }
  }
`;
export { SignupSuccessPageWrapper };
