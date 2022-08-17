import { Button } from "antd";
import calendarImg from "@/asset/calendar.png";
import userImg from "@/asset/user.png";
import { ExamItemWrapper } from "./style";

const ExamItem = (props) => {
  const { status, name, date, noOfStudent } = props;

  return (
    <ExamItemWrapper>
      <div
        className="status"
        style={{
          backgroundColor:
            status === "success"
              ? "var(--color-success)"
              : "var(--color-error)",
        }}
      />

      <div className="test-info">
        <div className="name">{name}</div>

        <div className="other-info">
          <div>
            <img src={calendarImg} alt="" />
            <span>{date}</span>
          </div>

          <div>
            <img src={userImg} alt="" />
            <span>{noOfStudent}</span>
          </div>
        </div>
      </div>

      <Button
        style={{
          backgroundColor: "#EEF2FA",
          color: "#375DE7",
          fontWeight: "500",
          border: "none",
        }}
      >
        Kết quả
      </Button>
    </ExamItemWrapper>
  );
};

export default ExamItem;
