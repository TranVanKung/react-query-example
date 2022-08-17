import { useState, useEffect } from "react";
import { Form, Button, Input, Row, Col, Alert } from "antd";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import bgUrl from "@/asset/auth-bg.png";
import vietnamImg from "@/asset/vietnam.png";
import { Icon } from "@/component";
import authApi from "@/api/auth";
import { SignUpPageWrapper, VietnamFlagWrapper } from "./style";
import { css } from "styled-components";

const VietnamFlag = () => {
  return (
    <VietnamFlagWrapper>
      <img src={vietnamImg} alt="" />
    </VietnamFlagWrapper>
  );
};

const SignUpPage = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [isBtnLoading, setBtnLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    form.setFieldsValue({
      firstName: "Công",
      lastName: "Trần Văn",
      address: "Giao Thuỷ, Nam Định",
      phoneNumber: "+84359481023",
      email: "trancongtr1071997@gmail.com",
      organizationName: "THPT Giao Thuỷ A",
      password: "0359481023",
      confirmPassword: "0359481023",
    });
  }, []);

  const { mutate: actCreateAdminAccount } = useMutation(
    (data) => authApi.createAdminAccount(data),
    {
      onSuccess: (res) => {
        if (res?.data) {
          history.push("/sign-up-success");
        } else {
          setErrorMsg(res?.error);
        }
      },
      onSettled: () => {
        setBtnLoading(false);
      },
    }
  );

  const onSignUp = async () => {
    const {
      firstName,
      lastName,
      address,
      phoneNumber,
      email,
      password,
      organizationName,
    } = await form.validateFields([
      "firstName",
      "lastName",
      "address",
      "phoneNumber",
      "email",
      "password",
      "confirmPassword",
      "organizationName",
    ]);

    const data = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      address,
      email,
      password,
      organization_name: organizationName,
    };

    errorMsg && setErrorMsg(null);
    actCreateAdminAccount(data);
    setBtnLoading(true);
  };

  const onBack = () => {
    history.push("/");
  };

  return (
    <SignUpPageWrapper bgUrl={bgUrl}>
      <div className="heading">BkProctor.</div>

      <div className="form">
        <div className="heading">Đăng ký</div>

        <div className="navigation">
          <div className="back" onClick={onBack}>
            <Icon name="arrow_back" style={{ fontSize: "1.6rem" }} />
            <span className="text">Quay lại</span>
          </div>
        </div>

        <Form layout="vertical" form={form}>
          <Row justify="space-between" gutter={24}>
            <Col span={12}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống",
                  },
                ]}
                name="firstName"
                label="Tên"
              >
                <Input
                  placeholder="Nhập tên của bạn"
                  size="large"
                  allowClear
                  className="custom-input"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống",
                  },
                ]}
                name="lastName"
                label="Họ và tên đệm"
              >
                <Input
                  placeholder="Nhập họ và tên đệm"
                  size="large"
                  allowClear
                  className="custom-input"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="space-between" gutter={24}>
            <Col span={12}>
              <Form.Item name="address" label="Địa chỉ">
                <Input
                  placeholder="Nhập địa chỉ"
                  size="large"
                  allowClear
                  className="custom-input"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="organizationName" label="Tên cơ quan">
                <Input
                  placeholder="Nhập nơi bạn đang làm việc, công tác"
                  size="large"
                  allowClear
                  className="custom-input"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="space-between" gutter={24}>
            <Col span={12}>
              <Form.Item
                name="phoneNumber"
                label="Số điện thoại"
                rules={[
                  () => ({
                    validator(_, value) {
                      if (!value) {
                        return Promise.reject(
                          new Error("Bạn chưa nhập *Số điện thoại*")
                        );
                      }

                      if (
                        !/([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/.test(
                          value
                        )
                      ) {
                        return Promise.reject(
                          new Error("Số điện thoại bạn nhập không hợp lệ")
                        );
                      }

                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input
                  placeholder="Nhập số điện thoại"
                  size="large"
                  allowClear
                  className="custom-input"
                  prefix={<VietnamFlag />}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa nhập *Email*",
                  },
                  {
                    type: "email",
                    message: "Email bạn nhập không hợp lệ",
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

          <Row justify="space-between" gutter={24}>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Nhập mật khẩu"
                  size="large"
                  allowClear
                  className="custom-input"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="confirmPassword"
                dependencies={["password"]}
                label="Xác nhận mật khẩu"
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Mật khẩu bạn nhập không trùng nhau")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Nhập lại mật khẩu"
                  size="large"
                  allowClear
                  className="custom-input"
                />
              </Form.Item>
            </Col>
          </Row>

          {errorMsg ? (
            <Row>
              <Alert
                message="Thông báo"
                description={errorMsg}
                closable={false}
                type="error"
                style={{ width: "100%" }}
              />
            </Row>
          ) : null}

          <Row justify="end">
            <Button
              style={{ marginTop: "2rem", width: "20rem" }}
              loading={isBtnLoading}
              className="primary-btn"
              type="primary"
              size="large"
              onClick={onSignUp}
            >
              Đăng ký
            </Button>
          </Row>
        </Form>
      </div>
    </SignUpPageWrapper>
  );
};

export default SignUpPage;
