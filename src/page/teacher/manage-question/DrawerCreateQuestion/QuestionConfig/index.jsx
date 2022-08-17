import { useEffect } from "react";
import { Form, Select, Input } from "antd";
import { connect } from "react-redux";
import { TextEditor } from "@/component";
import { EXAM_PAPER_TYPE } from "@/util/config";
import { QuestionConfigWrapper } from "./style";

const { Option } = Select;

const QuestionConfig = (props) => {
  const { question, setQuestion, selectedExam } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: selectedExam?.name,
      format: selectedExam?.format,
    });
  }, [selectedExam]);

  const onChangeQuestion = (value) => {
    setQuestion(value);
  };

  return (
    <QuestionConfigWrapper>
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Nội dung câu hỏi:"
          name="content"
          className="custom-form-item"
        >
          <TextEditor onChange={onChangeQuestion} content={question} />
        </Form.Item>

        <Form.Item
          label="Tên đề thi"
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
            placeholder="Nhập tên đề thi"
            size="large"
            className="custom-input"
            disabled={true}
          />
        </Form.Item>

        <Form.Item
          label="Loại đề thi"
          name="format"
          className="custom-form-item"
          rules={[
            {
              required: true,
              message: "Không được bỏ trống",
            },
          ]}
        >
          <Select
            className="custom-select"
            size="large"
            placeholder="Chọn loại đề thi"
            disabled={true}
          >
            {Object.keys(EXAM_PAPER_TYPE).map((key, index) => (
              <Option value={+key} key={index}>
                {EXAM_PAPER_TYPE[key]}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </QuestionConfigWrapper>
  );
};

export default connect(
  (state) => ({
    selectedExam: state.TeacherQuestion.selectedExam,
  }),
  {}
)(QuestionConfig);
