import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: var(--text-font);
    font-size: 62.5%;
  }

  * {
    box-sizing: border-box;
  }

  /* thay đổi màu mặc định khi kéo chọn vùng chữ của trình duyệt */
  ::selection {
    background: var(--color-primary) !important;
  }

  ::-moz-selection { /* Code for Firefox */
    background: var(--color-primary) !important;
  }

  :root {
    --text-font: "Open Sans", sans-serif;
    --color-text: #383c40;
    --color-text-secondary: #6E6B7B;
    --color-primary: #375DE7;
    --color-primary-light: #867ae9;
    --color-gray: #F4F7FE;
    --color-background: #F4F7FE;
    --color-background-gray: #f5f5f5;
    --box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
    --border-radius: 0.8rem;
    --border-radius-1: 1rem;
    --padding: 3rem 2.5rem;
    --padding-small: 1.5rem 1.5rem;
    --padding-page: 2rem 3rem;
    --padding-page-large: 3rem 4rem;
    --padding-content: 8.5rem 1rem 2rem 1.5rem;
    --padding-content-scroll: 2rem 0.8rem 2rem 2rem;
    --padding-content-small: 2.5rem 2.5rem 2rem 2.5rem;
    --margin-bottom: 1.5rem;
    --margin-bottom-small: 1rem;
    --margin-bottom-large: 2.5rem;
    --margin-right: 1.5rem;
    --margin-left: 1.5rem;
    --margin-left-large: 3rem;
    --margin-top: 1.5rem;
    --color-orange: #e7b237;
    --color-border: #e8e8e8;
    --color-success: #7FC8A9;
    --color-error: #FF6767;
    --background-success: rgba(127, 200, 169, 0.2);
    --background-error: rgba(255, 103, 103, 0.05);
    --background-warning: rgba(255, 188, 31, 0.08);
    --background-primary: rgba(133,122,233,0.5);
    --background-input: rgba(133, 122, 233, 0.1);
    --background-white: rgba(255, 255, 255, 0.3);
  }

  .ant-form-item {
    margin-bottom: 2rem !important;
  }

  .ant-form-item-label > label {
    color: var(---color-primary) !important;
    font-size: 1.6rem;
    font-weight: 500;
  }

  .ant-table-body {
    .ant-table-cell {
      font-size: 1.6rem;
    }
  }

  .ant-badge-status-text {
    font-size: 1.6rem;
  }

  .ant-tabs-tab {
    font-size: 1.5rem;
  }

  .ant-form-item-explain-error {
    margin-top: 0.6rem;
    font-size: 1.5rem;
  }

  .button-google {
    width: 100%;
    box-shadow: none !important;
    background-color: var(--color-gray) !important;
    cursor: pointer;
    display: flex !important;
    justify-content: center !important;
    color: var(--color-text) !important;
    font-family: var(--text-font) !important;
    padding: 0.2rem 2rem !important;
  

    & > div {
      background-color: var(--color-gray) !important;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .primary-btn, .download-btn {
    background-color: var(--color-primary);
    border-radius: var(--border-radius);
    font-size: 1.5rem;
    color: white;
    font-weight: 500;
    border: none !important;

    &:hover, &:active, &:focus {
      background-color: var(--color-primary);
      opacity: 0.85;
    }
  }

  .download-btn {
    background-color: var(--color-success);

    &:hover, &:active, &:focus {
      background-color: var(--color-success);
      color: white;
    }
  }

  .ghost-btn {
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    border-radius: var(--border-radius);
    font-size: 1.5rem;
    font-weight: 500;

    &:hover, &:active, &:focus {
      opacity: 0.85;
    }
  }

  .delete-btn {
    background-color: var(--color-error);
    border-radius: var(--border-radius);
    color: white;
    font-size: 1.5rem;
    font-weight: 500;
    border: none !important;

    &.disable {
      cursor: not-allowed;
      opacity: 0.6;

      &:hover, &:active, &:focus {
        opacity: 0.6;
      }
    }

    &:hover, &:active, &:focus {
      color: white;
      background-color: var(--color-error);
      opacity: 0.85;
    }
  }

  .edit-btn {
    background-color: var(--color-success);
    border-radius: 3px;
    color: white;
    font-size: 1.5rem;
    font-weight: 500;
    border: none !important;

    &:hover, &:active, &:focus {
      color: white;
      background-color: var(--color-success);
      opacity: 0.85;
    }
  }

  .detail-btn {
    background-color: var(--color-orange);
    border-radius: 3px;
    color: white;
    font-size: 1.5rem;
    font-weight: 500;
    border: none !important;

    &:hover, &:active, &:focus {
      color: white;
      background-color: var(--color-orange);
      opacity: 0.85;
    }
  }

  .custom-form-item {
    margin-bottom: 1.5rem;
  }

  .custom-input {
    background-color: var(--background-input) !important;
    border-radius: 0.4rem;
    font-weight: 400;
    border: 1px solid transparent !important;
    box-shadow: none !important;
    font-size: 1.6rem;

    input {
      background-color: transparent !important;
      font-weight: 400;
      font-size: 1.6rem;
    }

    &.ant-input-disabled {
      background: var(--color-background-gray) !important;
      color: var(--color-text) !important;
    }


    &:hover, &:focus {
      border: 1px solid var(--color-primary) !important;
    }
  }

  .custom-datepicker {
    width: 100%;
    background-color: var(--background-input) !important;
    border-radius: 0.4rem;
    border: 1px solid transparent !important;
    box-shadow: none !important;

    & input {
      font-weight: 400 !important;
      font-size: 1.6rem !important;
    }

    &.ant-picker-focused {
      border: 1px solid var(--color-primary) !important;
    }
  }

  .custom-select {
    width: 100%;
    font-size: 1.6rem;
    border: 1px solid transparent;
    font-weight: 400;
    
    .ant-select-selector {
      border: 1px solid transparent !important;
      outline: none !important;
      border-radius: 0.4rem !important;
      box-shadow: none !important;
      background-color: var(--background-input) !important;
    }

    &.ant-select-disabled {
      background: var(--color-background-gray) !important;
      border-radius: 0.4rem !important;

      .ant-select-selector {
        background: transparent !important;
        color: var(--color-text) !important;
      }
    }
  }

  .custom-input-number {
    width: 100%;
    background-color: var(--background-input) !important;
    border-radius: 0.4rem;
    border: 1px solid transparent !important;
    box-shadow: none !important;
    font-size: 1.6rem;

    & * {
      font-weight: 500 !important;
    }

    &:hover, &:focus {
      border: 1px solid var(--color-primary) !important;
    }

    &.ant-input-number-disabled {
      background: var(--color-background-gray) !important;

      &:hover, &:focus {
        border: 1px solid transparent!important;
      }
    }
  }

  .preview-test-drawer {
    .ant-drawer-body {
      padding: 0 !important;
      background-color: var(--color-background) !important;
    }
  }

  .editor-container {
    font-size: 1.5rem;
    line-height: 1.5;
  }
`;

export { GlobalStyle };
