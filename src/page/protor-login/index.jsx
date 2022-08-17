import { useState, useEffect } from "react";
import { Form, Button, Input, Row, Col } from "antd";
import { connect } from "react-redux";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import bgUrl from "@/asset/auth-bg.png";
import { Icon } from "@/component";
import authApi from "@/api/auth";
import { LoginPageWrapper } from "./style";

const LoginPage = (props) => {
  const history = useHistory();
  const [form] = Form.useForm();

  const [isBtnLoading, setBtnLoading] = useState(false);

  const { mutate: actGetProtorLoginCode } = useMutation(
    (data) => authApi.getLoginCode(data),
    {
      onSuccess: (res) => {
        if (res?.data) {
          history.push("/protor-login-code");
        }
      },
      onSettled: () => {
        setBtnLoading(false);
      },
    }
  );

  useEffect(() => {
    form.setFieldsValue({
      email: "cryptocallpro@gmail.com",
    });
  }, []);

  const onLogin = async () => {
    const { email } = await form.validateFields(["email"]);

    actGetProtorLoginCode({
      email,
      is_protor: true,
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
                        message: "Bạn chưa nhập *Email*",
                      },
                    ]}
                    name="email"
                    label="Email"
                  >
                    <Input
                      placeholder="Nhập email của bạn"
                      size="large"
                      allowClear
                      className="custom-input"
                    />
                  </Form.Item>
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
                    Lấy mã đăng nhập
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

export default connect((state) => ({}), {})(LoginPage);
