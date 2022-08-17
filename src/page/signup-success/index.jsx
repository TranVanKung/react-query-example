import { useHistory } from "react-router-dom";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import bgUrl from "@/asset/auth-bg.png";
import successImg from "@/asset/success.png";
import { SignupSuccessPageWrapper } from "./style";

const SignupSuccessPage = () => {
  const history = useHistory();

  const onGoToLogin = () => {
    history.push("/login");
  };

  return (
    <SignupSuccessPageWrapper bgUrl={bgUrl}>
      <div className="form">
        <img src={successImg} alt="" />

        <div className="text">
          Đăng kí tài khoản thành công. Vui lòng kiểm tra email để kích hoạt tài
          khoản
        </div>

        <Button
          className="primary-btn"
          size="large"
          type="primary"
          icon={<ArrowLeftOutlined />}
          onClick={onGoToLogin}
        >
          Quay lại đăng nhập
        </Button>
      </div>
    </SignupSuccessPageWrapper>
  );
};

export default SignupSuccessPage;
