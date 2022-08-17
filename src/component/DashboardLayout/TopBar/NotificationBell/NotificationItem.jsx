import moment from "moment";
import { connect } from "react-redux";
import { Status } from "@/component";
import { NotificationItemWrapper } from "./style";

const NotificationItem = (props) => {
  const { date, isRead, message, title } = props;

  return (
    <NotificationItemWrapper isNew={isRead}>
      <div className="date">
        <span className="dot" />
        <span>{moment(date).fromNow()}</span>

        <Status
          content={isRead ? "Đã đọc" : "Chưa đọc"}
          isSuccess={isRead}
          style={{ marginLeft: "auto" }}
        />
      </div>
      <div className="title">{title || ""}</div>
      <div className="message">{message}</div>
    </NotificationItemWrapper>
  );
};

export default connect((state) => ({}), {})(NotificationItem);
