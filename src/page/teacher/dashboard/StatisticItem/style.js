import styled from "styled-components";

const StatisticItemWrapper = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  flex-basis: 23%;
  display: flex;
  align-items: center;
  padding: 2.3rem 2rem;
  box-shadow: var(--box-shadow);

  img {
    margin-right: 1.5rem;
  }

  .info {
    .number {
      font-weight: 600;
      font-size: 2rem;
    }

    .text {
      font-size: 1.5rem;
    }
  }
`;

export { StatisticItemWrapper };
