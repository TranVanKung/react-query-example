import styled from "styled-components";

const ManageTeacherPageWrapper = styled.div`
  background-color: white;
  width: 100%;
  font-size: 1.6rem;
  border-radius: var(--border-radius);
  padding: var(--padding-page);
  flex: 1 1 auto;

  & > .heading {
    margin-bottom: var(--margin-bottom);
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

const VietnamFlagWrapper = styled.div`
  display: flex;

  img {
    height: 2.3rem;
    margin-right: 0.2rem;
  }
`;

export { ManageTeacherPageWrapper, VietnamFlagWrapper };
