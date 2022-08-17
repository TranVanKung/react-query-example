import { useEffect, useState } from "react";
import { Modal, Form, Button, Input, Row, Select, DatePicker } from "antd";
import { connect } from "react-redux";
import moment from "moment";
import _ from "lodash";
import {
  actSaveSelectedStudent,
  actSetModalStudentVisible,
  actSaveCreateStudent,
  actSaveUpdateStudent,
} from "@/redux/action/teacher/student";
import { useMutation } from "react-query";
import studentApi from "@/api/teacher/student";

const { Option } = Select;

const ModalStudent = (props) => {
  const { selectedStudent, isModalVisible, selectedExamRoom } = props;
  const [isBtnLoading, setBtnLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: selectedStudent?.name,
      email: selectedStudent?.email,
      phone_number: selectedStudent?.phone_number,
      gender: selectedStudent?.gender,
      date_of_birth: selectedStudent?.date_of_birth
        ? moment(selectedStudent?.date_of_birth)
        : moment(),
      address: selectedStudent?.address,
    });
  }, [selectedStudent, isModalVisible]);

  const { mutate: actCreateStudent } = useMutation(
    (body) => studentApi.createStudent(body),
    {
      onSuccess: (res) => {
        if (res?.data) {
          props.actSaveCreateStudent(res?.data);
          onCloseModal();
        } else if (res?.error) {
        }
      },
      onSettled: () => {
        setBtnLoading(false);
      },
    }
  );

  const { mutate: actUpdateStudent } = useMutation(
    (body) => studentApi.updateStudent(body),
    {
      onSuccess: (res) => {
        if (res?.data) {
          props.actSaveUpdateStudent(res?.data);
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
    props.actSetModalStudentVisible(false);
  };

  const afterCloseModal = () => {
    props.actSaveSelectedStudent({});
  };

  const onSubmitForm = async () => {
    const { name, email, phone_number, gender, date_of_birth, address } =
      await form.validateFields([
        "name",
        "email",
        "phone_number",
        "gender",
        "date_of_birth",
        "address",
      ]);

    const reqBody = {
      name,
      email,
      phone_number,
      gender,
      date_of_birth: date_of_birth.format("YYYY-MM-DD"),
      address,
      exam_room_id: selectedExamRoom?.id,
    };

    setBtnLoading(true);

    if (_.isEmpty(selectedStudent)) {
      actCreateStudent(reqBody);
    } else {
      actUpdateStudent({ id: selectedStudent?.id, ...reqBody });
    }
  };

  return (
    <Modal
      title={
        _.isEmpty(selectedStudent) ? "Tạo mới thí sinh" : "Chi tiết thí sinh"
      }
      onCancel={onCloseModal}
      afterClose={afterCloseModal}
      visible={isModalVisible}
      maskClosable={false}
      width="40rem"
      style={{ top: "1rem" }}
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
              {_.isEmpty(selectedStudent) ? "Thêm mới" : "Cập nhật"}
            </Button>
          </Row>
        </div>
      }
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Tên thí sinh"
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

        <Form.Item
          label="Ngày sinh"
          name="date_of_birth"
          className="custom-form-item"
        >
          <DatePicker
            placeholder="Chọn ngày - tháng - năm sinh"
            size="large"
            className="custom-datepicker"
            format="YYYY-MM-DD"
          />
        </Form.Item>

        <Form.Item label="Giới tính" name="gender" className="custom-form-item">
          <Select
            className="custom-select"
            size="large"
            placeholder="Chọn giới tính"
          >
            <Option value={0}>Nữ</Option>
            <Option value={1}>Nam</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Địa chỉ" name="address" className="custom-form-item">
          <Input
            placeholder="Nhập địa chỉ"
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
    selectedStudent: state.TeacherStudent.selectedStudent,
    isModalVisible: state.TeacherStudent.isModalVisible,
    selectedExamRoom: state.TeacherExamRoom.selectedExamRoom,
  }),
  {
    actSaveSelectedStudent,
    actSetModalStudentVisible,
    actSaveCreateStudent,
    actSaveUpdateStudent,
  }
)(ModalStudent);
