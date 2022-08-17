import styled from "styled-components";

const BasicExamConfigWrapper = styled.div`
  display: flex;
  position: relative;

  .basic-setting {
    padding: var(--padding-page);
    border-radius: var(--border-radius);
    background-color: white;
    height: 100%;
    flex-basis: 60%;
    margin-right: var(--margin-right);
    position: sticky;
    top: 8rem;

    .heading {
      margin-bottom: var(--margin-bottom);
    }
  }

  .advanced-setting {
    padding: var(--padding-page);
    border-radius: var(--border-radius);
    background-color: white;
    height: 100%;
    flex-basis: 40%;

    .heading {
      margin-bottom: var(--margin-bottom);
    }
  }
`;

export { BasicExamConfigWrapper };
