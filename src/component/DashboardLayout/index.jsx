import { connect } from "react-redux";
import { LayoutWrapper, ContentWrapper, MainSectionWrapper } from "./style";
import Sidebar from "./SideBar";
import Topbar from "./TopBar";

const DashboardLayout = (props) => {
  const { children, isSidebarOpen } = props;

  return (
    <LayoutWrapper>
      <Sidebar />
      <MainSectionWrapper isSidebarOpen={isSidebarOpen}>
        <Topbar />

        <ContentWrapper>{children}</ContentWrapper>
      </MainSectionWrapper>
    </LayoutWrapper>
  );
};

export default connect(
  (state) => ({
    isSidebarOpen: state.App.isSidebarOpen,
  }),
  {}
)(DashboardLayout);
