import { useEffect, useMemo } from "react";
import {
  Form,
  Row,
  Col,
  Input,
  Switch,
  Divider,
  Checkbox,
  InputNumber,
  Button,
  message,
} from "antd";
import { connect } from "react-redux";
import { actSaveSelectedExamination } from "@/redux/action/teacher/examination";
import { CardHeading } from "@/component";
import { BasicExamConfigWrapper } from "./style";

const { TextArea } = Input;

const BasicExamConfig = (props) => {
  const {
    selectedExamination,
    setSubmitFirstStep,
    shouldSubmitFirstStep,
    setNextStep,
  } = props;

  const [form] = Form.useForm();

  const isUpdateMode = useMemo(() => {
    return selectedExamination?.id || false;
  }, [selectedExamination]);

  useEffect(() => {
    form.setFieldsValue({
      name: selectedExamination?.name,
      description: selectedExamination?.description,
      duration_mins: selectedExamination?.exam_configuration?.duration_mins,
      shuffle_question:
        selectedExamination?.exam_configuration?.shuffle_question,
      shuffle_answer: selectedExamination?.exam_configuration?.shuffle_answer,
      enable_reminder: selectedExamination?.exam_configuration?.enable_reminder,
      subject: selectedExamination?.subject,
      academic_year: selectedExamination?.academic_year,
      semester: selectedExamination?.semester,
    });
  }, [selectedExamination]);

  useEffect(() => {
    if (shouldSubmitFirstStep) {
      submitFirstStep();
    }
  }, [shouldSubmitFirstStep]);

  const submitFirstStep = async () => {
    try {
      const {
        name,
        description,
        duration_mins,
        shuffle_question,
        shuffle_answer,
        enable_reminder,
        subject,
        academic_year,
        semester,
      } = await form.validateFields([
        "name",
        "description",
        "duration_mins",
        "shuffle_question",
        "shuffle_answer",
        "enable_reminder",
        "subject",
        "academic_year",
        "semester",
      ]);

      props.actSaveSelectedExamination({
        name,
        description,
        subject,
        academic_year,
        semester,
        exam_configuration: {
          duration_mins,
          shuffle_question,
          shuffle_answer,
          enable_reminder,
        },
      });

      setNextStep();
      setSubmitFirstStep(false);
    } catch (err) {}
  };

  const onSaveExamInfo = () => {
    message.success("Đã lưu Cài đặt cơ bản");
  };

  const onSaveExamConfig = () => {
    message.success("Đã lưu Cấu hình bài thi");
  };

  return (
    <Form layout="vertical" form={form} style={{ width: "100%" }}>
      <BasicExamConfigWrapper>
        <div className="basic-setting">
          <div className="heading">
            <CardHeading>Cài đặt cơ bản</CardHeading>
          </div>

          <Row justify="space-between" gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Kỳ thi"
                name="name"
                className="custom-form-item"
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống",
                  },
                ]}
              >
                <TextArea
                  placeholder="Nhập tên kỳ thi"
                  size="large"
                  className="custom-input"
                  rows={4}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Mô tả"
                name="description"
                className="custom-form-item"
              >
                <TextArea
                  placeholder="Nhập mô tả"
                  size="large"
                  className="custom-input"
                  rows={4}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="space-between" gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Thời gian làm bài (phút)"
                name="duration_mins"
                className="custom-form-item"
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống",
                  },
                ]}
              >
                <InputNumber
                  size="large"
                  className="custom-input-number"
                  placeholder="Chọn thời gian làm bài"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Môn thi"
                name="subject"
                className="custom-form-item"
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống",
                  },
                ]}
              >
                <Input
                  placeholder="Nhập tên môn thi"
                  size="large"
                  className="custom-input"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="space-between" gutter={16}>
            <Col span={12}>
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
            </Col>

            <Col span={12}>
              <Form.Item
                label="Học kỳ"
                name="semester"
                className="custom-form-item"
              >
                <Input
                  placeholder="Nhập tên học kỳ"
                  size="large"
                  className="custom-input"
                />
              </Form.Item>
            </Col>
          </Row>

          {isUpdateMode ? (
            <Row justify="end">
              <Button
                className="primary-btn"
                type="primary"
                size="large"
                onClick={onSaveExamInfo}
              >
                Lưu
              </Button>
            </Row>
          ) : null}
        </div>

        <div className="advanced-setting">
          <div className="heading">
            <CardHeading>Cấu hình bài thi</CardHeading>
          </div>

          <Row style={{ width: "100%" }}>
            <Col span={24}>
              <Form.Item
                label="Đảo câu hỏi"
                name="shuffle_question"
                className="custom-form-item"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ width: "100%" }}>
            <Col span={24}>
              <Form.Item
                label="Đảo đáp án"
                name="shuffle_answer"
                className="custom-form-item"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <div className="heading">
            <CardHeading>Cấu hình giám sát thông minh</CardHeading>
          </div>

          <Form.Item name="supervisorConfig" className="custom-form-item">
            <Checkbox.Group style={{ width: "100%" }}>
              <Row>
                <Col span={12}>
                  <Checkbox value="copy">Chống copy</Checkbox>
                </Col>

                <Col span={12}>
                  <Checkbox value="paste">Chống paste</Checkbox>
                </Col>
              </Row>

              <Row style={{ marginTop: "1rem" }}>
                <Col span={12}>
                  <Checkbox value="openOtherApplication">
                    Chống mở ứng dụng khác
                  </Checkbox>
                </Col>

                <Col span={12}>
                  <Checkbox value="weirdSound">Báo hiệu âm thanh lạ</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Divider />

          <div className="heading">
            <CardHeading>Cấu hình thông báo</CardHeading>
          </div>

          <Row style={{ width: "100%" }}>
            <Col span={24}>
              <Form.Item
                label="Gửi thông tin kỳ thi qua email học viên"
                name="enable_reminder"
                className="custom-form-item"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          {isUpdateMode ? (
            <Row justify="end">
              <Button
                className="primary-btn"
                type="primary"
                size="large"
                onClick={onSaveExamConfig}
              >
                Lưu
              </Button>
            </Row>
          ) : null}
        </div>
      </BasicExamConfigWrapper>
    </Form>
  );
};

export default connect(
  (state) => ({
    selectedExamination: state.TeacherExamination.selectedExamination,
  }),
  { actSaveSelectedExamination }
)(BasicExamConfig);
