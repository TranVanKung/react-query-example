import { useEffect, useState } from "react";
import { Modal, Form, Button, Input, Row, InputNumber } from "antd";
import { connect } from "react-redux";
import _ from "lodash";
import {
  actSaveSelectedExamRoom,
  actSetModalExamRoomVisible,
  actSaveCreateExamRoom,
  actSaveUpdateExamRoom,
} from "@/redux/action/teacher/examRoom";
import { useMutation } from "react-query";
import examRoomApi from "@/api/teacher/exam-room";

const ModalExamRoom = (props) => {
  const { selectedExamRoom, isModalVisible } = props;
  const [isBtnLoading, setBtnLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: selectedExamRoom?.name,
      nums_candidates: selectedExamRoom?.nums_candidates,
      academic_year: selectedExamRoom?.academic_year,
      semester: selectedExamRoom?.semester,
    });
  }, [selectedExamRoom, isModalVisible]);

  const { mutate: actCreateExamRoom } = useMutation(
    (body) => examRoomApi.createExamRoom(body),
    {
      onSuccess: (res) => {
        if (res?.data) {
          props.actSaveCreateExamRoom(res?.data);
          onCloseModal();
        } else if (res?.error) {
        }
      },
      onSettled: () => {
        setBtnLoading(false);
      },
    }
  );

  const { mutate: actUpdateExamRoom } = useMutation(
    (body) => examRoomApi.updateExamRoom(body),
    {
      onSuccess: (res) => {
        if (res?.data) {
          props.actSaveUpdateExamRoom(res?.data);
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
    props.actSetModalExamRoomVisible(false);
  };

  const afterCloseModal = () => {
    props.actSaveSelectedExamRoom({});
  };

  const onSubmitForm = async () => {
    const { name, nums_candidates, academic_year, semester } =
      await form.validateFields([
        "name",
        "nums_candidates",
        "academic_year",
        "semester",
      ]);

    const reqBody = {
      name,
      nums_candidates,
      academic_year,
      semester,
    };

    setBtnLoading(true);

    if (_.isEmpty(selectedExamRoom)) {
      actCreateExamRoom(reqBody);
    } else {
      actUpdateExamRoom({ id: selectedExamRoom?.id, ...reqBody });
    }
  };

  return (
    <Modal
      title={
        _.isEmpty(selectedExamRoom) ? "Tạo mới phòng thi" : "Chi tiết phòng thi"
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
              {_.isEmpty(selectedExamRoom) ? "Thêm mới" : "Cập nhật"}
            </Button>
          </Row>
        </div>
      }
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Tên phòng thi"
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
            placeholder="Nhập tên phòng thi"
            size="large"
            className="custom-input"
          />
        </Form.Item>

        <Form.Item
          label="Số học sinh"
          name="nums_candidates"
          className="custom-form-item"
        >
          <InputNumber
            placeholder="Nhập số học sinh"
            size="large"
            className="custom-input-number"
          />
        </Form.Item>

        <Form.Item
          label="Năm học"
          name="academic_year"
          className="custom-form-item"
        >
          <Input
            placeholder="Nhập tên năm học"
            size="large"
            className="custom-input"
          />
        </Form.Item>

        <Form.Item label="Học kỳ" name="semester" className="custom-form-item">
          <Input
            placeholder="Nhập tên học kỳ"
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
    selectedExamRoom: state.TeacherExamRoom.selectedExamRoom,
    isModalVisible: state.TeacherExamRoom.isModalVisible,
  }),
  {
    actSaveSelectedExamRoom,
    actSetModalExamRoomVisible,
    actSaveCreateExamRoom,
    actSaveUpdateExamRoom,
  }
)(ModalExamRoom);
