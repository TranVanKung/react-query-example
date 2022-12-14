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
        _.isEmpty(selectedStudent) ? "T???o m???i th?? sinh" : "Chi ti???t th?? sinh"
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
              Hu???
            </Button>

            <Button
              type="primary"
              className="primary-btn"
              size="large"
              style={{ marginTop: "1rem" }}
              loading={isBtnLoading}
              onClick={onSubmitForm}
            >
              {_.isEmpty(selectedStudent) ? "Th??m m???i" : "C???p nh???t"}
            </Button>
          </Row>
        </div>
      }
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="T??n th?? sinh"
          name="name"
          className="custom-form-item"
          rules={[
            {
              required: true,
              message: "Kh??ng ???????c b??? tr???ng",
            },
          ]}
        >
          <Input
            placeholder="Nh???p h??? v?? t??n"
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
              message: "Kh??ng ???????c b??? tr???ng",
            },
            {
              type: "email",
              message: "Email kh??ng h???p l???",
            },
          ]}
          className="custom-form-item"
        >
          <Input
            placeholder="Nh???p email"
            size="large"
            className="custom-input-number"
          />
        </Form.Item>

        <Form.Item
          label="S??? ??i???n tho???i"
          name="phone_number"
          className="custom-form-item"
          rules={[
            {
              required: true,
              message: "Kh??ng ???????c b??? tr???ng",
            },
          ]}
        >
          <Input
            placeholder="Nh???p s??? ??i???n tho???i"
            size="large"
            className="custom-input"
          />
        </Form.Item>

        <Form.Item
          label="Ng??y sinh"
          name="date_of_birth"
          className="custom-form-item"
        >
          <DatePicker
            placeholder="Ch???n ng??y - th??ng - n??m sinh"
            size="large"
            className="custom-datepicker"
            format="YYYY-MM-DD"
          />
        </Form.Item>

        <Form.Item label="Gi???i t??nh" name="gender" className="custom-form-item">
          <Select
            className="custom-select"
            size="large"
            placeholder="Ch???n gi???i t??nh"
          >
            <Option value={0}>N???</Option>
            <Option value={1}>Nam</Option>
          </Select>
        </Form.Item>

        <Form.Item label="?????a ch???" name="address" className="custom-form-item">
          <Input
            placeholder="Nh???p ?????a ch???"
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
