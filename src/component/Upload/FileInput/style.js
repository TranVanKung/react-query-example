import styled from "styled-components";

const FileInputWrapper = styled.div``;

const FilePlaceholderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 99%;
  height: 99%;
  border-radius: var(--border-radius-1);
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .icon {
    border-radius: var(--border-radius-1);

    img {
      height: 7rem;
      width: 8rem;
      border-radius: var(--border-radius-1);
      object-fit: cover;
    }
  }

  .text {
    margin-top: 0.3rem;
    font-size: 1.4rem;
    color: var(--color-text-secondary);
  }

  .helper {
    margin-top: 0.5rem;
    font-size: 1.6rem;
    color: var(--color-text);
    font-weight: 500;
  }
`;

const FileInfoWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 99%;
  height: 99%;
  border-radius: var(--border-radius-1);
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-position: center;
    border-radius: var(--border-radius-1);
    object-fit: contain;
  }
`;

export { FileInputWrapper, FilePlaceholderWrapper, FileInfoWrapper };
