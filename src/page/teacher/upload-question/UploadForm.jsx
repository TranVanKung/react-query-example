import { Form, Input, Row, Button } from "antd";
import { FileInput } from "@/component";

const Uploadform = () => {
  const [form] = Form.useForm();

  return (
    <Form layout="vertical" form={form}>
      <Form.Item
        label="Tải lên câu hỏi"
        name="file"
        className="custom-form-item"
      >
        <FileInput />
      </Form.Item>

      <Form.Item
        label="Số lượng câu hỏi"
        name="noOfQuestion"
        className="custom-form-item"
      >
        <Input
          placeholder="Nhập số lượng câu hỏi"
          size="large"
          className="custom-input"
        />
      </Form.Item>

      <Form.Item>
        <Row justify="end" style={{ marginTop: "1.5rem" }}>
          <Button
            danger
            className="delete-btn"
            size="large"
            style={{ marginRight: "1rem" }}
          >
            Huỷ
          </Button>

          <Button type="primary" className="primary-btn" size="large">
            Hoàn thành
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default Uploadform;
