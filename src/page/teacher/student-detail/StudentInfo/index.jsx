import { Divider } from "antd";
import { StudentInfoWrapper } from "./style";

const StudentInfo = () => {
  return (
    <StudentInfoWrapper>
      <div className="avatar">
        <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="" />
      </div>

      <div className="name">Trần Văn Công</div>

      <Divider />

      <div className="section">
        <div className="heading">Thông tin học tập</div>

        <div className="item">
          <div className="label">Lớp</div>
          <div className="value">11C1</div>
        </div>

        <div className="item">
          <div className="label">Điểm đánh giá</div>
          <div className="value" style={{ color: "var(--color-success)" }}>
            3.8 GPA
          </div>
        </div>
      </div>

      <Divider />

      <div className="section">
        <div className="heading">Thông tin học sinh</div>

        <div className="item">
          <div className="label">Họ và tên</div>
          <div className="value">Trần Văn Công</div>
        </div>

        <div className="item">
          <div className="label">Ngày sinh</div>
          <div className="value">30/01/1999</div>
        </div>

        <div className="item">
          <div className="label">Địa chỉ</div>
          <div className="value">
            33 Nguyễn An Ninh, Tương Mai, Hoàng Mai Hà Nội
          </div>
        </div>
      </div>
    </StudentInfoWrapper>
  );
};

export default StudentInfo;
