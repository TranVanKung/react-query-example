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
    message.success("???? l??u C??i ?????t c?? b???n");
  };

  const onSaveExamConfig = () => {
    message.success("???? l??u C???u h??nh b??i thi");
  };

  return (
    <Form layout="vertical" form={form} style={{ width: "100%" }}>
      <BasicExamConfigWrapper>
        <div className="basic-setting">
          <div className="heading">
            <CardHeading>C??i ?????t c?? b???n</CardHeading>
          </div>

          <Row justify="space-between" gutter={16}>
            <Col span={12}>
              <Form.Item
                label="K??? thi"
                name="name"
                className="custom-form-item"
                rules={[
                  {
                    required: true,
                    message: "Kh??ng ???????c b??? tr???ng",
                  },
                ]}
              >
                <TextArea
                  placeholder="Nh???p t??n k??? thi"
                  size="large"
                  className="custom-input"
                  rows={4}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="M?? t???"
                name="description"
                className="custom-form-item"
              >
                <TextArea
                  placeholder="Nh???p m?? t???"
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
                label="Th???i gian l??m b??i (ph??t)"
                name="duration_mins"
                className="custom-form-item"
                rules={[
                  {
                    required: true,
                    message: "Kh??ng ???????c b??? tr???ng",
                  },
                ]}
              >
                <InputNumber
                  size="large"
                  className="custom-input-number"
                  placeholder="Ch???n th???i gian l??m b??i"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="M??n thi"
                name="subject"
                className="custom-form-item"
                rules={[
                  {
                    required: true,
                    message: "Kh??ng ???????c b??? tr???ng",
                  },
                ]}
              >
                <Input
                  placeholder="Nh???p t??n m??n thi"
                  size="large"
                  className="custom-input"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="space-between" gutter={16}>
            <Col span={12}>
              <Form.Item
                label="N??m h???c"
                name="academic_year"
                className="custom-form-item"
              >
                <Input
                  placeholder="Nh???p t??n n??m h???c"
                  size="large"
                  className="custom-input"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="H???c k???"
                name="semester"
                className="custom-form-item"
              >
                <Input
                  placeholder="Nh???p t??n h???c k???"
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
                L??u
              </Button>
            </Row>
          ) : null}
        </div>

        <div className="advanced-setting">
          <div className="heading">
            <CardHeading>C???u h??nh b??i thi</CardHeading>
          </div>

          <Row style={{ width: "100%" }}>
            <Col span={24}>
              <Form.Item
                label="?????o c??u h???i"
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
                label="?????o ????p ??n"
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
            <CardHeading>C???u h??nh gi??m s??t th??ng minh</CardHeading>
          </div>

          <Form.Item name="supervisorConfig" className="custom-form-item">
            <Checkbox.Group style={{ width: "100%" }}>
              <Row>
                <Col span={12}>
                  <Checkbox value="copy">Ch???ng copy</Checkbox>
                </Col>

                <Col span={12}>
                  <Checkbox value="paste">Ch???ng paste</Checkbox>
                </Col>
              </Row>

              <Row style={{ marginTop: "1rem" }}>
                <Col span={12}>
                  <Checkbox value="openOtherApplication">
                    Ch???ng m??? ???ng d???ng kh??c
                  </Checkbox>
                </Col>

                <Col span={12}>
                  <Checkbox value="weirdSound">B??o hi???u ??m thanh l???</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Divider />

          <div className="heading">
            <CardHeading>C???u h??nh th??ng b??o</CardHeading>
          </div>

          <Row style={{ width: "100%" }}>
            <Col span={24}>
              <Form.Item
                label="G???i th??ng tin k??? thi qua email h???c vi??n"
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
                L??u
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
