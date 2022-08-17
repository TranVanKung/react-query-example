import styled from "styled-components";

export const sidebarWidth = "24rem";
export const collapsedSidebarWidth = "7rem";

const LayoutWrapper = styled.div`
  background-color: var(--color-background);
`;

// main section
const MainSectionWrapper = styled.div`
  position: relative;
  margin-left: ${(props) =>
    props.isSidebarOpen ? sidebarWidth : collapsedSidebarWidth};
  width: ${(props) =>
    props.isSidebarOpen
      ? `calc(100%-${sidebarWidth})`
      : `calc(100%-${collapsedSidebarWidth})`};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.2s ease-in-out;
`;

// content
const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  position: relative;
  background-color: var(--color-background);
  padding: var(--padding-content);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export { LayoutWrapper, ContentWrapper, MainSectionWrapper };
