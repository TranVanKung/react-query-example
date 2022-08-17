import styled from "styled-components";

const StudentDetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1 1 auto;
  font-size: 1.6rem;
  width: 100%;

  .table-wrapper {
    flex-basis: 70%;
    margin-right: 2rem;
  }

  .info-wrapper {
    flex-grow: 1;
    flex-basis: 30%;
  }
`;

export { StudentDetailWrapper };
