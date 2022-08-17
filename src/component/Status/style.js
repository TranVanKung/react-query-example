import styled from "styled-components";

const StatusWrapper = styled.div`
  font-size: 1.2rem;
  background: ${(props) =>
    props.isSuccess ? "var(--background-success)" : "var(--background-error)"};
  padding: 0.2rem 1rem;
  color: ${(props) =>
    props.isSuccess ? "var(--color-successs)" : "var(--color-error)"};
  border-radius: 1rem;
`;

export { StatusWrapper };
