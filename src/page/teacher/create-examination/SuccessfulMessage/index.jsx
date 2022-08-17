import { useHistory } from "react-router-dom";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import studentImg from "@/asset/student.svg";
import { SuccessfulMessageWrapper } from "./style";

const SuccessfulMessage = () => {
  const history = useHistory();

  const onGoBack = () => {
    history.push("/teacher/manage-examination");
  };

  return (
    <SuccessfulMessageWrapper>
      <img src={studentImg} alt="" />

      <div className="text">
        Tạo kỳ thi thành công. Quay lại trang "Quản lí kỳ thi" để xem kết quả
      </div>

      <Button
        className="primary-btn"
        type="primary"
        onClick={onGoBack}
        size="large"
      >
        <ArrowLeftOutlined />
        Quay lại
      </Button>
    </SuccessfulMessageWrapper>
  );
};

export default SuccessfulMessage;
