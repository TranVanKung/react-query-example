import styled from "styled-components";

const BaseFileInputWrapper = styled.div`
  .drop-zone {
    height: 20rem;
    border: 2px dashed var(--color-border);
    border-radius: var(--border-radius-1);
    position: relative;
    width: 100%;
    transition: all 0.2s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      border: 2px dashed var(--color-primary);
      background-color: var(--color-border);

      .tool {
        visibility: visible;
      }
    }

    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      opacity: 0;
    }

    .tool {
      border-radius: var(--border-radius);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.3);
      visibility: hidden;
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      .delete-icon,
      .preview-icon {
        font-size: 3rem;
        color: white;
      }

      .preview-icon {
        margin-right: 1rem;
      }
    }
  }

  .file-info {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 0.5rem;

    .file-name {
      margin-right: 1rem;
      color: var(--color-text-secondary);
      font-weight: 600;
      font-size: 1.4rem;
    }

    .file-size {
      color: var(--color-text);
      font-size: 1.3rem;
      font-style: italic;
    }
  }
`;

export { BaseFileInputWrapper };
