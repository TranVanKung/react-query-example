import styled from "styled-components";

const AuthTypeWrapper = styled.div`
  flex-basis: 25%;
  background-color: var(--color-background);
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 2rem;
  border: 1px solid
    ${(props) => (props?.isActive ? "var(--color-primary)" : "transparent")};
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  & > * {
    color: ${(props) =>
      props?.isActive ? "var(--color-primary)" : "var(--text-color)"};
  }

  &:not(:last-of-type) {
    margin-right: 2.5rem;
  }

  .material-icons-outlined {
    font-size: 4rem;
  }

  .label {
    margin-top: 1rem;
    font-weight: 500;
  }
`;

export { AuthTypeWrapper };
