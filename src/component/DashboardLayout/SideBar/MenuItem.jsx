import { connect } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { MenuItemWrapper } from "./style";

const MenuItem = (props) => {
  const {
    label,
    icon: Icon,
    url,
    notification,
    notificationColor,
    isSidebarOpen,
  } = props;
  const location = useLocation();
  const history = useHistory();

  const onChangeRoute = () => {
    history.push(url);
  };

  return (
    <MenuItemWrapper
      className={
        location?.pathname === url
          ? "menu-item-wrapper active"
          : "menu-item-wrapper"
      }
      notificationColor={notificationColor}
    >
      <div className="menu-item single" onClick={onChangeRoute}>
        <span className="menu-item__icon">{Icon}</span>

        {isSidebarOpen ? (
          <span className="menu-item__label">{label}</span>
        ) : null}

        {notification ? (
          <div className="menu-item__notification">
            <span>{notification}</span>
          </div>
        ) : null}
      </div>

      <ul className="sub-menu blank">
        <li className="sub-menu__name">{label}</li>
      </ul>
    </MenuItemWrapper>
  );
};

export default connect((state) => ({
  isSidebarOpen: state.App.isSidebarOpen,
}))(MenuItem);
