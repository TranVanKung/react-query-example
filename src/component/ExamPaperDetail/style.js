import styled from "styled-components";

const ExamPaperDetailWrapper = styled.div`
  margin-top: var(--margin-top);
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 100%;
  position: relative;

  .list-question {
    padding: var(--padding-content-scroll);
    background-color: white;
    border-radius: var(--border-radius);
    flex-basis: 73%;
    margin-right: var(--margin-right);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;
    position: relative;
    min-height: 85vh;

    .title {
      padding-left: 2.5rem;
      font-weight: 600;
      margin-bottom: var(--margin-bottom);
      font-size: 1.9rem;
      align-self: flex-start;
      text-decoration: underline;
    }
  }

  .list-answer {
    padding: var(--padding-page-large);
    background-color: white;
    border-radius: var(--border-radius);
    flex-basis: 27%;
    align-self: flex-start;

    .heading {
      margin-bottom: var(--margin-bottom);
      display: flex;
    }
  }
`;

export { ExamPaperDetailWrapper };
