import { useState, useEffect } from "react";
import { Form, Button, Input } from "antd";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import authApi from "@/api/auth";
import bgUrl from "@/asset/auth-bg.png";
import iconUrl from "@/asset/icon5.png";
import { Icon } from "@/component";
import { ProtorLoginCodePageWrapper } from "./style";

const ProtorLoginCodePage = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [isBtnLoading, setBtnLoading] = useState(false);

  const { mutate: actAccessToken } = useMutation(
    (data) => authApi.getAccessToken(data),
    {
      onSuccess: (res) => {
        console.log("res", res);
        if (res?.data) {
          // history.push("/protor-login-code");
        }
      },
      onSettled: () => {
        setBtnLoading(false);
      },
    }
  );

  const onGetAccessToken = async () => {
    const { opt } = await form.validateFields(["opt"]);

    actAccessToken({
      opt,
      is_protor: true,
      email: "cryptocallpro@gmail.com",
    });

    setBtnLoading(true);
  };

  const onBack = () => {
    history.push("/protor-login");
  };

  return (
    <ProtorLoginCodePageWrapper bgUrl={bgUrl}>
      <div className="heading">BkProctor.</div>

      <div className="form">
        <div className="navigation">
          <div className="back" onClick={onBack}>
            <Icon name="arrow_back" style={{ fontSize: "1.6rem" }} />
            <span className="text">Quay lại</span>
          </div>
        </div>

        <div className="icon">
          <img src={iconUrl} alt="" />
        </div>

        <div className="heading">Nhập mã xác minh</div>

        <div className="desc">
          Chúng tôi đã gửi mã xác minh đến email của bạn. Vui lòng nhập mã xác
          minh để đăng nhập
        </div>

        <Form layout="vertical" form={form}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Bạn chưa nhập *Mã xác minh*",
              },
            ]}
            name="opt"
            label="Mã xác minh"
          >
            <Input
              placeholder="Nhập mã xác minh"
              size="large"
              allowClear
              className="custom-input"
            />
          </Form.Item>

          <Button
            style={{ width: "100%", marginTop: "2rem" }}
            loading={isBtnLoading}
            className="primary-btn"
            type="primary"
            size="large"
            onClick={onGetAccessToken}
          >
            Đăng nhập
          </Button>

          <div className="help">
            Bạn không nhận được mã? <span>Gửi lại mã</span>
          </div>
        </Form>
      </div>
    </ProtorLoginCodePageWrapper>
  );
};

export default ProtorLoginCodePage;
