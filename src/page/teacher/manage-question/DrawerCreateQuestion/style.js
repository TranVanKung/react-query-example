import styled from "styled-components";

const DrawerCreateQuestionWrapper = styled.div`
  font-size: 1.6rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: var(--padding-content-small);
  position: relative;
  overflow-y: scroll;

  .question-config {
    flex-basis: 40%;
    margin-right: var(--margin-right);
    position: sticky;
    width: 100%;
    top: 0;
  }

  .list-answer {
    flex-basis: 60%;
  }
`;

export { DrawerCreateQuestionWrapper };
