import styled from "styled-components";

const UploadQuestionPageWrapper = styled.div`
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

  .upload-form {
    margin-top: 4rem;
    width: 50rem;
    padding: var(--padding-page);
    border-radius: var(--border-radius);
    background-color: white;
  }

  .test-detail {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export { UploadQuestionPageWrapper };
