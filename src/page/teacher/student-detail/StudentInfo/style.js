import styled from "styled-components";

const StudentInfoWrapper = styled.div`
  border-radius: var(--border-radius);
  background-color: white;
  min-height: 100%;
  padding-bottom: 2rem;

  .avatar {
    width: 100%;

    img {
      width: 100%;
      height: 25rem;
      object-fit: cover;
      object-position: center;
    }
  }

  .name {
    padding: 0 2rem;
    font-weight: 600;
    font-size: 2.4rem;
    margin-top: 1.5rem;
    margin-bottom: -1rem;
  }

  .section {
    padding: 0 2rem;
    margin-top: -1rem;
    margin-bottom: -1rem;

    .heading {
      font-size: 1.8rem;
      font-weight: 500;
      margin-bottom: 0.8rem;
    }

    .item {
      margin-bottom: 1.5rem;

      .label {
        font-size: 1.3rem;
        color: var(--color-text-secondary);
      }

      .value {
        margin-top: 0.2rem;
        font-size: 1.4rem;
        color: var(--color-text);
        font-weight: 500;
      }
    }
  }
`;

export { StudentInfoWrapper };
