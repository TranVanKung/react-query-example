import { useState, useEffect } from "react";
import { Form, Button, Input, Row, Col, Checkbox } from "antd";
import { connect } from "react-redux";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import bgUrl from "@/asset/auth-bg.png";
import { Icon } from "@/component";
import authApi from "@/api/auth";
import { actSaveUserSignIn, actSaveGetUserInfo } from "@/redux/action/auth";
import { LoginPageWrapper } from "./style";

const LoginPage = (props) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [isBtnLoading, setBtnLoading] = useState(false);

  const { mutate: actLogin } = useMutation((data) => authApi.logIn(data), {
    onSuccess: (res) => {
      if (res?.data) {
        props.actSaveUserSignIn(res?.data);
        actGetUserInfo(res?.data?.access_token);
      }
    },
  });

  const { mutate: actGetUserInfo } = useMutation(
    (accessToken) => authApi.getUserInfo(accessToken),
    {
      onSuccess: (res) => {
        if (res?.data) {
          props.actSaveGetUserInfo(res?.data);
          history.push("/admin/manage-teacher");
        }
      },
      onSettled: () => {
        setBtnLoading(false);
      },
    }
  );

  useEffect(() => {
    form.setFieldsValue({
      username: "trancongtr1071997@gmail.com",
      password: "0359481023",
    });
  }, []);

  const onLogin = async () => {
    const { username, password } = await form.validateFields([
      "username",
      "password",
    ]);

    actLogin({
      username,
      password,
    });

    setBtnLoading(true);
  };

  const onBack = () => {
    history.push("/");
  };

  return (
    <LoginPageWrapper bgUrl={bgUrl}>
      <div className="heading">BkProctor.</div>

      <div className="form">
        <div className="heading">Đăng nhập</div>

        <div className="navigation">
          <div className="back" onClick={onBack}>
            <Icon name="arrow_back" style={{ fontSize: "1.6rem" }} />
            <span className="text">Quay lại</span>
          </div>
        </div>

        <Row justify="center">
          <Col span={24}>
            <Form layout="vertical" form={form}>
              <Row justify="center" style={{ marginBottom: "1rem" }}>
                <Col span={24}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa nhập *Số điện thoại /Email*",
                      },
                    ]}
                    name="username"
                  >
                    <Input
                      placeholder="Số điện thoại /Email"
                      size="large"
                      allowClear
                      className="custom-input"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row justify="center">
                <Col span={24}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa nhập *Mật khẩu*",
                      },
                    ]}
                    name="password"
                  >
                    <Input.Password
                      placeholder="Mật khẩu"
                      size="large"
                      allowClear
                      className="custom-input"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row justify="space-between">
                <Col>
                  <Checkbox>Nhớ tài khoản</Checkbox>
                </Col>

                <Col>
                  <span className="forget-pwd">Quên mật khẩu</span>
                </Col>
              </Row>

              <Row justify="center">
                <Col span={24}>
                  <Button
                    style={{ width: "100%", marginTop: "3rem" }}
                    loading={isBtnLoading}
                    className="primary-btn"
                    type="primary"
                    size="large"
                    onClick={onLogin}
                  >
                    Đăng nhập
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </LoginPageWrapper>
  );
};

export default connect((state) => ({}), {
  actSaveUserSignIn,
  actSaveGetUserInfo,
})(LoginPage);
