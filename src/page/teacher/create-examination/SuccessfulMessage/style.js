import styled from "styled-components";

const SuccessfulMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;

  img {
    height: 30rem;
  }

  .text {
    font-size: 1.9rem;
    font-weight: 500;
    margin-bottom: 4rem;
  }
`;

export { SuccessfulMessageWrapper };
