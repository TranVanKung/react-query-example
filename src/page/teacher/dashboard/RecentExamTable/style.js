import styled from "styled-components";

const RecentExamTableWrapper = styled.div`
  border-radius: var(--border-radius);
  background-color: white;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 2rem;

  .list-exam {
    display: flex;
    flex-direction: column;
  }
`;

export { RecentExamTableWrapper };
