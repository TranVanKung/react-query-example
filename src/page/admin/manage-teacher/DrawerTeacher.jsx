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
        _.isEmpty(selectedTeacher) ? "T???o m???i gi??o vi??n" : "Ch???nh s???a gi??o vi??n"
      }
      placement="right"
      onClose={onCloseDrawer}
      visible={isDrawerVisible}
      maskClosable={false}
      width="40rem"
    >
      <Form layout="vertical" form={form}>
        <Form.Item label="T??n" name="first_name" className="custom-form-item">
          <Input
            placeholder="Nh???p t??n gi??o vi??n"
            size="large"
            className="custom-input"
          />
        </Form.Item>

        <Form.Item name="last_name" label="H??? v?? t??n ?????m">
          <Input
            placeholder="Nh???p h??? v?? t??n ?????m"
            size="large"
            allowClear
            className="custom-input"
          />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Kh??ng ???????c b??? tr???ng",
            },
          ]}
          name="display_name"
          label="T??n hi???n th???"
        >
          <Input
            placeholder="Nh???p t??n hi???n th???"
            size="large"
            allowClear
            className="custom-input"
          />
        </Form.Item>

        <Form.Item
          name="phone_number"
          label="S??? ??i???n tho???i"
          rules={[
            () => ({
              validator(_, value) {
                if (
                  !/([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/.test(
                    value
                  )
                ) {
                  return Promise.reject(
                    new Error("S??? ??i???n tho???i b???n nh???p kh??ng h???p l???")
                  );
                }

                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input
            placeholder="Nh???p s??? ??i???n tho???i"
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
              message: "B???n ch??a nh???p *Email*",
            },
            {
              type: "email",
              message: "Email b???n nh???p kh??ng h???p l???",
            },
          ]}
        >
          <Input
            placeholder="Nh???p email"
            size="large"
            className="custom-input"
          />
        </Form.Item>

        {_.isEmpty(selectedTeacher) ? (
          <Form.Item
            name="password"
            label="M???t kh???u"
            rules={[
              {
                required: true,
                message: "Kh??ng ???????c b??? tr???ng",
              },
            ]}
          >
            <Input.Password
              placeholder="Nh???p m???t kh???u"
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
              message="Th??ng b??o"
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
              {_.isEmpty(selectedTeacher) ? "Th??m m???i" : "C???p nh???t"}
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
