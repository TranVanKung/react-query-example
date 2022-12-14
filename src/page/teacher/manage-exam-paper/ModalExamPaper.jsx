import { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Button,
  Input,
  Row,
  Select,
  Checkbox,
  InputNumber,
} from "antd";
import { connect } from "react-redux";
import { useMutation } from "react-query";
import _ from "lodash";
import {
  actSaveSelectedExamPaper,
  actSetModalExamPaperVisible,
  actSaveCreateExamPaper,
  actSaveUpdateExamPaper,
} from "@/redux/action/teacher/examPaper";
import { EXAM_PAPER_TYPE } from "@/util/config";
import examPaperApi from "@/api/teacher/exam-paper";

const { Option } = Select;

const ModalExamPaper = (props) => {
  const { selectedExamPaper, isModalVisible } = props;
  const [isBtnLoading, setBtnLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: selectedExamPaper?.name,
      score_level: selectedExamPaper?.score_level,
      duration_mins: selectedExamPaper?.duration_mins,
      format: selectedExamPaper?.format,
      is_equal_score: selectedExamPaper?.is_equal_score || false,
    });
  }, [selectedExamPaper, isModalVisible]);

  const { mutate: actCreateExamPaper } = useMutation(
    (body) => examPaperApi.createExamPaper(body),
    {
      onSuccess: (res) => {
        if (res?.data) {
          props.actSaveCreateExamPaper(res?.data);
          onCloseModal();
        } else if (res?.error) {
        }
      },
      onSettled: () => {
        setBtnLoading(false);
      },
    }
  );

  const { mutate: actUpdateExamPaper } = useMutation(
    (body) => examPaperApi.updateExamPaper(body),
    {
      onSuccess: (res) => {
        if (res?.data) {
          props.actSaveUpdateExamPaper(res?.data);
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
    props.actSetModalExamPaperVisible(false);
  };

  const afterCloseModal = () => {
    props.actSaveSelectedExamPaper({});
  };

  const onSubmitForm = async () => {
    const { name, score_level, duration_mins, format, is_equal_score } =
      await form.validateFields([
        "name",
        "score_level",
        "duration_mins",
        "format",
        "is_equal_score",
      ]);

    const reqBody = {
      name,
      score_level,
      duration_mins,
      format,
      is_equal_score,
    };

    setBtnLoading(true);

    if (_.isEmpty(selectedExamPaper)) {
      actCreateExamPaper(reqBody);
    } else {
      actUpdateExamPaper({ id: selectedExamPaper?.id, ...reqBody });
    }
  };

  return (
    <Modal
      title={
        _.isEmpty(selectedExamPaper) ? "T???o m???i ????? thi" : "Chi ti???t ????? thi"
      }
      onCancel={onCloseModal}
      afterClose={afterCloseModal}
      visible={isModalVisible}
      maskClosable={false}
      width="43rem"
      footer={
        <div style={{ marginBottom: "1rem" }}>
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
              onClick={onSubmitForm}
              loading={isBtnLoading}
            >
              {_.isEmpty(selectedExamPaper) ? "Th??m m???i" : "C???p nh???t"}
            </Button>
          </Row>
        </div>
      }
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="T??n ????? thi"
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
            placeholder="Nh???p t??n ????? thi"
            size="large"
            className="custom-input"
          />
        </Form.Item>

        <Form.Item
          label="Thang ??i???m"
          name="score_level"
          className="custom-form-item"
          rules={[
            {
              required: true,
              message: "Kh??ng ???????c b??? tr???ng",
            },
          ]}
        >
          <InputNumber
            placeholder="Nh???p thang ??i???m"
            size="large"
            className="custom-input-number"
          />
        </Form.Item>

        <Form.Item
          label="Th???i gian l??m b??i (ph??t)"
          name="duration_mins"
          className="custom-form-item"
        >
          <InputNumber
            placeholder="Nh???p th???i gian l??m b??i"
            size="large"
            className="custom-input-number"
          />
        </Form.Item>

        <Form.Item
          label="Lo???i ????? thi"
          name="format"
          className="custom-form-item"
          rules={[
            {
              required: true,
              message: "Kh??ng ???????c b??? tr???ng",
            },
          ]}
        >
          <Select
            className="custom-select"
            size="large"
            placeholder="Ch???n lo???i ????? thi"
          >
            {Object.keys(EXAM_PAPER_TYPE).map((key, index) => (
              <Option value={+key} key={index}>
                {EXAM_PAPER_TYPE[key]}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="is_equal_score"
          className="custom-form-item"
          valuePropName="checked"
        >
          <Checkbox>C??c c??u ??i???m b???ng nhau</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(
  (state) => ({
    selectedExamPaper: state.TeacherExamPaper.selectedExamPaper,
    isModalVisible: state.TeacherExamPaper.isModalVisible,
  }),
  {
    actSaveSelectedExamPaper,
    actSetModalExamPaperVisible,
    actSaveCreateExamPaper,
    actSaveUpdateExamPaper,
  }
)(ModalExamPaper);
