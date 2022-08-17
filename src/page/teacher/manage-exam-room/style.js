import styled from "styled-components";

const ManageExamRoomPageWrapper = styled.div`
  background-color: white;
  width: 100%;
  font-size: 1.6rem;
  border-radius: var(--border-radius);
  padding: var(--padding-page);
  flex: 1 1 auto;

  & > .heading {
    margin-bottom: var(--margin-bottom-large);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .extras {
      display: flex;
      align-items: center;
      align-self: center;
    }
  }
`;

export { ManageExamRoomPageWrapper };
