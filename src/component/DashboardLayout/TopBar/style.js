import styled from "styled-components";
import { sidebarWidth, collapsedSidebarWidth } from "../style";

// top bar

const TopBarWrapper = styled.div`
  height: 7rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: ${(props) =>
    props.isSidebarOpen ? sidebarWidth : collapsedSidebarWidth};
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  width: ${(props) =>
    props.isSidebarOpen
      ? `calc(100%-${sidebarWidth})`
      : `calc(100%-${collapsedSidebarWidth})`};
  background-color: white;
  z-index: 1;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 0.75rem 1.5rem rgba(18, 38, 63, 0.03);

  .toggle-icon {
    cursor: pointer;
    padding: 0.2rem 0.5rem;
    font-size: 2rem;
    margin-left: 0.5rem;
    color: var(--color-text);
  }

  .search-input {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #f3f3f9;
    padding: 0.5rem 0.3rem 0.5rem 2rem;
    border-radius: 3rem;
    margin-left: 2rem;
    margin-right: auto;

    .search-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 1rem;
      font-size: 1.5rem;
    }

    input {
      border: none;
      outline: none;
      box-shadow: none;
      background-color: #f3f3f9;
      color: #495057;
      font-size: 1.4rem;
      font-weight: 500;
      width: 23rem;
    }
  }

  .admin-widget {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: auto;
    margin-right: 3rem;
    border: 1px solid var(--color-border);
    padding: 3px 1rem;
    border-radius: var(--border-radius);
    cursor: pointer;

    .member-type {
      font-size: 1.4rem;
      display: flex;
      align-items: center;
      margin-right: 1rem;
      background-color: var(--background-warning);
      padding: 4px 1rem;
      border-radius: var(--border-radius);
    }
  }
`;

const TopBarDropdownItemWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colorTextSecondary};

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.5rem;

    .material-icons-outlined {
      font-size: 1.6rem;
    }
  }

  .text {
    font-weight: 500;
    font-size: 1.4rem;
  }
`;

export { TopBarWrapper, TopBarDropdownItemWrapper };
