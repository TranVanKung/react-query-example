import { useState } from "react";
import { connect } from "react-redux";
import { Button, Alert } from "antd";
import { useHistory } from "react-router-dom";
import { actSetUserType } from "@/redux/action/app";
import homeImg from "@/asset/home-bg.png";
import { USER_TYPE } from "@/util/config";
import { HomePageWrapper } from "./style";
import UserType from "./UserType";

const listAuthType = [
  {
    icon: "admin_panel_settings",
    label: "Admin",
    value: USER_TYPE.ADMIN,
  },
  {
    icon: "supervised_user_circle",
    label: "Giám thị",
    value: USER_TYPE.SUPERVISOR,
  },
  {
    icon: "school",
    label: "Giáo viên",
    value: USER_TYPE.TEACHER,
  },
];

const HomePage = (props) => {
  const { userType } = props;
  const [error, setError] = useState(null);
  const history = useHistory();

  const renderListUserType = () =>
    listAuthType.map((item, index) => (
      <UserType
        icon={item?.icon}
        label={item?.label}
        value={item?.value}
        key={index}
        onClick={() => onChangeUserType(item?.value)}
      />
    ));

  const onLogin = () => {
    if (userType !== USER_TYPE.SUPERVISOR) {
      history.push("/login");
    } else {
      history.push("/protor-login");
    }
  };

  const onChangeUserType = (value) => {
    error && setError(null);
    props.actSetUserType(value);
  };

  const onSignUp = () => {
    if (userType !== USER_TYPE.ADMIN) {
      setError("Chức năng *Đăng kí tài khoản* chỉ hỗ trợ người dùng admin");
    } else {
      history.push("/sign-up");
    }
  };

  return (
    <HomePageWrapper>
      <div className="background">
        <img src={homeImg} alt="" />
      </div>

      <div className="main">
        <div className="heading">Chào mừng bạn đến với BKproctor</div>

        <div className="desc">
          Vui lòng chọn 1 trong các hình thức đăng nhập dưới đây
        </div>

        <div className="list-user-type">{renderListUserType()}</div>

        <Button
          type="primary"
          className="primary-btn"
          size="large"
          style={{ marginTop: "2rem" }}
          onClick={onLogin}
        >
          Tiếp tục
        </Button>

        <div className="sign-up">
          hoặc <span onClick={onSignUp}>Đăng kí tài khoản</span> nếu chưa có tài
          khoản đăng nhập
        </div>

        {error ? (
          <Alert
            message={<span style={{ fontWeight: 500 }}>Thông báo</span>}
            description={error}
            type="error"
            closable={false}
            style={{ marginTop: "2rem", width: "100%" }}
          />
        ) : null}
      </div>
    </HomePageWrapper>
  );
};

export default connect((state) => ({ userType: state?.App.userType }), {
  actSetUserType,
})(HomePage);
