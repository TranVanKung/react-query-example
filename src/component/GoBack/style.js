import styled from "styled-components";

const GoBackWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: var(--margin-right);
  padding-right: var(--margin-right);

  .text {
    margin-left: 0.5rem;
    font-size: 1.5rem;
    color: var(--color-text-secondary);
  }

  border-right: 1px solid var(--color-border);
`;

export { GoBackWrapper };
