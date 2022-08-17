import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import _ from "lodash";
import { Icon } from "@/component";
import { MenuItemWrapper } from "./style";

const SubMenuItem = (props) => {
  const { label, icon: MenuIcon, listChildMenu, isSidebarOpen } = props;
  const location = useLocation();
  const history = useHistory();
  const [menuClassname, setMenuClassname] = useState("menu-item-wrapper");

  let active = _.find(listChildMenu, { url: location.pathname });

  if (!active) {
    listChildMenu.forEach((childMenu) => {
      if (childMenu?.listChildUrl?.includes(location.pathname)) {
        active = true;
      }
    });
  }

  useEffect(() => {
    if (active) {
      setMenuClassname("menu-item-wrapper active show-menu");
    }
  }, [active]);

  const onShowMenu = () => {
    if (menuClassname.includes("show-menu")) {
      setMenuClassname(
        active ? "menu-item-wrapper active" : "menu-item-wrapper"
      );
    } else {
      setMenuClassname(
        active
          ? "menu-item-wrapper show-menu active"
          : "menu-item-wrapper show-menu"
      );
    }
  };

  const onChangeRoute = (url) => {
    history.push(url);
  };

  const renderListSubMenu = () =>
    listChildMenu.map((childMenu, index) => {
      const isItemActive =
        location.pathname === childMenu.url ||
        childMenu?.listChildUrl?.includes(location.pathname);

      return (
        <li
          key={index}
          onClick={() => onChangeRoute(childMenu.url)}
          style={{
            color: isItemActive ? "var(--color-primary-light)" : "",
            fontWeight: isItemActive ? 700 : 400,
          }}
        >
          <span>{childMenu.label}</span>

          {childMenu.notification ? (
            <span
              style={{
                backgroundColor: childMenu.notificationColor
                  ? childMenu.notificationColor.toString()
                  : "transparent",
              }}
              className="menu-item__notification"
            >
              {childMenu.notification}
            </span>
          ) : null}
        </li>
      );
    });

  return (
    <MenuItemWrapper className={menuClassname}>
      <div className="sub-menu-item" onClick={onShowMenu}>
        <div className="menu-item">
          <span className="menu-item__icon">{MenuIcon}</span>

          {isSidebarOpen ? (
            <span className="menu-item__label">{label}</span>
          ) : null}
        </div>

        <div className="icon-wrapper">
          <Icon name="expand_more" />
        </div>
      </div>

      <ul className="sub-menu">
        {!isSidebarOpen ? (
          <li className="sub-menu__name category">{label}</li>
        ) : null}

        {renderListSubMenu()}
      </ul>
    </MenuItemWrapper>
  );
};

export default connect((state) => ({
  isSidebarOpen: state.App.isSidebarOpen,
}))(SubMenuItem);
