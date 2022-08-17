import { useEffect, useState } from "react";
import { Modal, Form, Button, Input, Row } from "antd";
import { connect } from "react-redux";
import _ from "lodash";
import {
  actSaveSelectedProtor,
  actSetModalProtorVisible,
  actSaveCreateProtor,
  actSaveUpdateProtor,
} from "@/redux/action/teacher/protor";
import { useMutation } from "react-query";
import protorApi from "@/api/teacher/protor";

const ModalProtor = (props) => {
  const { selectedProtor, isModalVisible } = props;
  const [isBtnLoading, setBtnLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: selectedProtor?.name,
      email: selectedProtor?.email,
      phone_number: selectedProtor?.phone_number,
    });
  }, [selectedProtor, isModalVisible]);

  const { mutate: actCreateProtor } = useMutation(
    (body) => protorApi.createProtor(body),
    {
      onSuccess: (res) => {
        if (res?.data) {
          props.actSaveCreateProtor(res?.data);
          onCloseModal();
        } else if (res?.error) {
        }
      },
      onSettled: () => {
        setBtnLoading(false);
      },
    }
  );

  const { mutate: actUpdateProtor } = useMutation(
    (body) => protorApi.updateProtor(body),
    {
      onSuccess: (res) => {
        if (res?.data) {
          props.actSaveUpdateProtor(res?.data);
          onCloseModal();
        } else if (res?.error) {
        }
      },
      onSettled: () => {
        setBtnLoading(false);
      },
    }
  );

  const onCloseModal = () => {
    props.actSetModalProtorVisible(false);
  };

  const afterCloseModal = () => {
    props.actSaveSelectedProtor({});
  };

  const onSubmitForm = async () => {
    const { name, email, phone_number } = await form.validateFields([
      "name",
      "email",
      "phone_number",
    ]);

    const reqBody = {
      name,
      email,
      phone_number,
    };

    setBtnLoading(true);

    if (_.isEmpty(selectedProtor)) {
      actCreateProtor(reqBody);
    } else {
      actUpdateProtor({ id: selectedProtor?.id, ...reqBody });
    }
  };

  return (
    <Modal
      title={
        _.isEmpty(selectedProtor) ? "Tạo mới giám thị" : "Chi tiết giám thị"
      }
      onCancel={onCloseModal}
      afterClose={afterCloseModal}
      visible={isModalVisible}
      maskClosable={false}
      width="40rem"
      footer={
        <div>
          <Row justify="end">
            <Button
              size="large"
              style={{
                marginTop: "1rem",
                borderRadius: "8px",
                marginRight: "1rem",
              }}
              onClick={onCloseModal}
            >
              Huỷ
            </Button>

            <Button
              type="primary"
              className="primary-btn"
              size="large"
              style={{ marginTop: "1rem" }}
              loading={isBtnLoading}
              onClick={onSubmitForm}
            >
              {_.isEmpty(selectedProtor) ? "Thêm mới" : "Cập nhật"}
            </Button>
          </Row>
        </div>
      }
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Họ và tên giám thị"
          name="name"
          className="custom-form-item"
          rules={[
            {
              required: true,
              message: "Không được bỏ trống",
            },
          ]}
        >
          <Input
            placeholder="Nhập họ và tên"
            size="large"
            className="custom-input"
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Không được bỏ trống",
            },
            {
              type: "email",
              message: "Email không hợp lệ",
            },
          ]}
          className="custom-form-item"
        >
          <Input
            placeholder="Nhập email"
            size="large"
            className="custom-input-number"
          />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone_number"
          className="custom-form-item"
          rules={[
            {
              required: true,
              message: "Không được bỏ trống",
            },
          ]}
        >
          <Input
            placeholder="Nhập số điện thoại"
            size="large"
            className="custom-input"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(
  (state) => ({
    selectedProtor: state.TeacherProtor.selectedProtor,
    isModalVisible: state.TeacherProtor.isModalVisible,
  }),
  {
    actSaveSelectedProtor,
    actSetModalProtorVisible,
    actSaveCreateProtor,
    actSaveUpdateProtor,
  }
)(ModalProtor);
