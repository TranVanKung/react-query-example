import styled from "styled-components";

const DashboardPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1 1 auto;
  font-size: 1.6rem;
  width: 100%;

  .list-statistic {
    display: flex;
    margin-bottom: 3rem;
    justify-content: space-between;
  }

  .main {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .next-exam-wrapper {
      flex-basis: 70%;
      margin-right: 2rem;
    }

    .recent-exam-wrapper {
      flex-grow: 1;
      flex-basis: 30%;
    }
  }
`;

export { DashboardPageWrapper };
