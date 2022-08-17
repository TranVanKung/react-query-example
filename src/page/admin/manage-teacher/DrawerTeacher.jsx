import { useEffect, useState } from "react";
import { Drawer, Form, Button, Input, Row, Alert } from "antd";
import { connect } from "react-redux";
import _ from "lodash";
import { useMutation } from "react-query";
import teacherApi from "@/api/admin/teacher";
import {
  actSaveCreateTeacher,
  actSaveUpdateTeacher,
  actSaveSelectedTeacher,
  actSetDrawerTeacherVisible,
} from "@/redux/action/admin/teacher";
import vietnamImg from "@/asset/vietnam.png";
import { VietnamFlagWrapper } from "./style";

const VietnamFlag = () => {
  return (
    <VietnamFlagWrapper>
      <img src={vietnamImg} alt="" />
    </VietnamFlagWrapper>
  );
};

const DrawerTeacher = (props) => {
  const { selectedTeacher, isDrawerVisible } = props;
  const [errorMsg, setErrorMsg] = useState(false);
  const [isBtnLoading, setBtnLoading] = useState(false);
  const [form] = Form.useForm();

  const { mutate: actCreateTeacher } = useMutation(
    (body) => teacherApi.createTeacher(body),
    {
      onSuccess: (res) => {
        if (res?.data) {
          props.actSaveCreateTeacher(res?.data);
          onCloseDrawer();
        } else if (res?.error) {
          setErrorMsg(res?.error);
        }
      },
      onSettled: () => {
        setBtnLoading(false);
      },
    }
  );

  const { mutate: actUpdateTeacher } = useMutation(
    (body) => teacherApi.updateTeacher(body),
    {
      onSuccess: (res) => {
        if (res?.data) {
          props.actSaveUpdateTeacher(res?.data);
          onCloseDrawer();
        } else if (res?.error) {
          setErrorMsg(res?.error);
        }
      },
      onSettled: () => {
        setBtnLoading(false);
      },
    }
  );

  useEffect(() => {
    form.setFieldsValue({
      first_name: selectedTeacher?.first_name || "",
      last_name: selectedTeacher?.last_name || "",
      phone_number: selectedTeacher?.phone_number || "",
      display_name: selectedTeacher?.display_name || "",
      email: selectedTeacher?.email || "",
      password: selectedTeacher?.password || "",
    });
  }, [selectedTeacher, isDrawerVisible]);

  const onCloseDrawer = () => {
    props.actSetDrawerTeacherVisible(false);

    setTimeout(() => {
      props.actSaveSelectedTeacher({});
    }, 200);
  };

  const onSubmitForm = async () => {
    const {
      first_name,
      last_name,
      phone_number,
      email,
      password,
      display_name,
    } = await form.validateFields([
      "first_name",
      "last_name",
      "display_name",
      "phone_number",
      "email",
      "password",
    ]);

    const reqBody = {
      first_name,
      last_name,
      phone_number,
      email,
      password,
      display_name,
    };

    errorMsg && setErrorMsg(null);
    setBtnLoading(true);

    if (_.isEmpty(selectedTeacher)) {
      actCreateTeacher(reqBody);
    } else {
      actUpdateTeacher({ id: selectedTeacher?.id, ...reqBody });
    }
  };

  return (
    <Drawer
      title={
        _.isEmpty(selectedTeacher) ? "Tạo mới giáo viên" : "Chỉnh sửa giáo viên"
      }
      placement="right"
      onClose={onCloseDrawer}
      visible={isDrawerVisible}
      maskClosable={false}
      width="40rem"
    >
      <Form layout="vertical" form={form}>
        <Form.Item label="Tên" name="first_name" className="custom-form-item">
          <Input
            placeholder="Nhập tên giáo viên"
            size="large"
            className="custom-input"
          />
        </Form.Item>

        <Form.Item name="last_name" label="Họ và tên đệm">
          <Input
            placeholder="Nhập họ và tên đệm"
            size="large"
            allowClear
            className="custom-input"
          />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Không được bỏ trống",
            },
          ]}
          name="display_name"
          label="Tên hiển thị"
        >
          <Input
            placeholder="Nhập tên hiển thị"
            size="large"
            allowClear
            className="custom-input"
          />
        </Form.Item>

        <Form.Item
          name="phone_number"
          label="Số điện thoại"
          rules={[
            () => ({
              validator(_, value) {
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

        <Form.Item
          label="Email"
          name="email"
          className="custom-form-item"
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
        >
          <Input
            placeholder="Nhập email"
            size="large"
            className="custom-input"
          />
        </Form.Item>

        {_.isEmpty(selectedTeacher) ? (
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
        ) : null}

        {errorMsg ? (
          <Row style={{ marginTop: "var(--margin-top)" }}>
            <Alert
              type="error"
              message="Thông báo"
              description={errorMsg}
              style={{ width: "100%" }}
            />
          </Row>
        ) : null}

        <Form.Item>
          <Row justify="end">
            <Button
              type="primary"
              className="primary-btn"
              size="large"
              style={{ marginTop: "1rem" }}
              onClick={onSubmitForm}
              loading={isBtnLoading}
            >
              {_.isEmpty(selectedTeacher) ? "Thêm mới" : "Cập nhật"}
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default connect(
  (state) => ({
    selectedTeacher: state.AdminTeacher.selectedTeacher,
    isDrawerVisible: state.AdminTeacher.isDrawerVisible,
  }),
  {
    actSaveSelectedTeacher,
    actSetDrawerTeacherVisible,
    actSaveCreateTeacher,
    actSaveUpdateTeacher,
  }
)(DrawerTeacher);
