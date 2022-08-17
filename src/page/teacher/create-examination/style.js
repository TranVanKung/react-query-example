import styled from "styled-components";

const CreateExamPageWrapper = styled.div`
  width: 100%;
  font-size: 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 auto;

  .step-wrapper {
    width: 100%;
    padding: var(--padding-page);
    background-color: white;
    display: flex;
    align-items: center;
    border-radius: var(--border-radius);
  }

  .config-step {
    width: 100%;
    margin-top: 3rem;
  }
`;

export { CreateExamPageWrapper };
