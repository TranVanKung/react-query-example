import { useEffect } from "react";
import { Icon } from "@/component";
import { connect } from "react-redux";
import { SidebarWrapper } from "./style";
import MenuItem from "./MenuItem";
import SubMenuItem from "./SubMenuItem";

const appName = "BKProctor.";

const Sidebar = (props) => {
  const { isSidebarOpen } = props;

  return (
    <SidebarWrapper className={!isSidebarOpen ? "close" : ""}>
      <div className="logo-wrapper">
        <span className="logo-name">{appName}</span>
      </div>

      <ul className="menu">
        <div>
          <MenuItem
            label="Trang chủ"
            icon={<Icon name="home" />}
            url="/admin/index"
          />
        </div>

        <div>
          <SubMenuItem
            label="Admin"
            icon={<Icon name="admin_panel_settings" />}
            listChildMenu={[
              {
                label: "Giáo viên",
                notification: "10+",
                notificationColor: "green",
                url: "/admin/manage-teacher",
              },
              {
                label: "Giám thị",
                notification: "20+",
                notificationColor: "purple",
                url: "/admin/manage-supervisor",
              },
            ]}
          />
        </div>

        <div>
          <SubMenuItem
            label="Giám thị"
            icon={<Icon name="supervised_user_circle" />}
            listChildMenu={[
              {
                label: "Lịch thi",
                url: "/supervisor/manage-schedule",
              },
              {
                label: "Lớp thi",
                url: "/supervisor/manage-exam",
              },
            ]}
          />
        </div>

        <div>
          <SubMenuItem
            label="Giáo viên"
            icon={<Icon name="school" />}
            listChildMenu={[
              {
                label: "Tổng quan",
                url: "/teacher/dashboard",
              },
              {
                label: "Giám thị",
                url: "/teacher/manage-protor",
              },
              {
                label: "Lịch thi",
                url: "/teacher/schedule",
              },
              {
                label: "Phòng thi",
                url: "/teacher/manage-exam-room",
              },
              {
                label: "Thí sinh",
                url: "/teacher/manage-student",
              },
              {
                label: "Kỳ thi",
                url: "/teacher/manage-examination",
                listChildUrl: ["/teacher/create-examination"],
              },
              {
                label: "Đề thi",
                url: "/teacher/manage-exam-paper",
                listChildUrl: [
                  "/teacher/manage-question",
                  "/teacher/upload-question",
                ],
              },
              {
                label: "Kết quả thi",
                url: "/teacher/manage-result",
              },
            ]}
          />
        </div>
      </ul>
    </SidebarWrapper>
  );
};

export default connect(
  (state) => ({
    isSidebarOpen: state.App?.isSidebarOpen,
  }),
  {}
)(Sidebar);
