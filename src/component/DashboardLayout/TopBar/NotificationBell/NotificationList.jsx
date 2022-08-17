import { connect } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import { Icon } from "@/component";
import { NotificationListWrapper } from "./style";
import NotificationItem from "./NotificationItem";

const NotificationList = (props) => {
  const { listAllNotificationStatus, isLightMode } = props;

  const renderListNotification = () =>
    listAllNotificationStatus.map((item, index) => (
      <NotificationItem
        key={index}
        title={item?.notification?.title}
        message={item?.notification?.message}
        date={+item?.notification?.createdAt}
        isRead={item?.isRead}
        notificationId={item?.notification?._id}
      />
    ));

  return (
    <NotificationListWrapper isLightMode={isLightMode}>
      <div className="heading">
        <div className="text">Danh sách thông báo</div>

        <div className="view-all">
          <span className="text">Xem tất cả</span>
          <div className="icon">
            <Icon name="visibility" />
          </div>
        </div>
      </div>

      <Scrollbars style={{ height: 440 }}>
        <div className="list">{renderListNotification()}</div>
      </Scrollbars>
    </NotificationListWrapper>
  );
};

export default connect((state) => ({}))(NotificationList);
