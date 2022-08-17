import { connect } from "react-redux";
import { Menu, Avatar, Dropdown } from "antd";
import { Icon } from "@/component";
import { actSetSideBarOpen } from "@/redux/action/app";
import { actUserSignOut } from "@/redux/action/auth";
import { TopBarDropdownItemWrapper, TopBarWrapper } from "./style";
import rankImg from "@/asset/ranking.png";
import NotificationBell from "./NotificationBell";

const TopBar = (props) => {
  const { isSidebarOpen } = props;

  const onToggleSidebar = () => {
    props.actSetSideBarOpen(!isSidebarOpen);
  };

  const onLogOut = () => {
    props.actUserSignOut();
  };

  const renderUserMenu = () => {
    return (
      <Menu>
        <Menu.Item key="1" onClick={onLogOut}>
          <TopBarDropdownItemWrapper>
            <span className="icon">
              <Icon name="logout" />
            </span>

            <span className="text">Đăng xuất</span>
          </TopBarDropdownItemWrapper>
        </Menu.Item>

        <Menu.Item key="2">
          <TopBarDropdownItemWrapper>
            <span className="icon">
              <Icon name="admin_panel_settings" />
            </span>

            <span className="text">Thông tin tài khoản</span>
          </TopBarDropdownItemWrapper>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <TopBarWrapper isSidebarOpen={isSidebarOpen}>
      <div className="toggle-icon" onClick={onToggleSidebar}>
        {!isSidebarOpen ? <Icon name="menu" /> : <Icon name="menu_open" />}
      </div>

      <div className="search-input">
        <div className="search-icon"></div>

        <input type="text" placeholder="Tìm kiếm..." />
      </div>

      <Dropdown
        overlay={renderUserMenu()}
        placement="bottomLeft"
        overlayStyle={{ minWidth: 150 }}
      >
        <div className="admin-widget">
          <div className="member-type">
            <img className="icon" src={rankImg} alt="" />
            <div className="label">Member gold</div>
          </div>

          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </div>
      </Dropdown>
    </TopBarWrapper>
  );
};

export default connect(
  (state) => ({
    isSidebarOpen: state.App.isSidebarOpen,
  }),
  { actSetSideBarOpen, actUserSignOut }
)(TopBar);
