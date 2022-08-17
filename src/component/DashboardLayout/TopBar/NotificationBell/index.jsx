import { Badge, Dropdown } from "antd";
import { Icon } from "@/component";
import { connect } from "react-redux";
import { NotificationBellWrapper } from "./style";
import NotificationList from "./NotificationList";

const NotificationBell = (props) => {
  const { listAllNotificationStatus } = props;

  return (
    <NotificationBellWrapper data-tut="reactour-step-7">
      <Dropdown overlay={<NotificationList />} placement="bottomRight">
        <Badge
          count={
            listAllNotificationStatus.filter(
              (notification) => !notification?.isRead
            ).length
          }
        >
          <div className="icon">
            <Icon name="notifications_none" />
          </div>
        </Badge>
      </Dropdown>
    </NotificationBellWrapper>
  );
};

export default connect((state) => ({}), {})(NotificationBell);
