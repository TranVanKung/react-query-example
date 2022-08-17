import { Table, Checkbox, Space } from "antd";
import { ALPHABET } from "@/util/config";
import { QuestionWrapper } from "./style";

const CheckboxGroup = Checkbox.Group;

const columns = [
  {
    title: "Câu trả lời",
    dataIndex: "listAnswer",
    key: "listAnswer",
    width: "35%",
    render: (listAnswer, record) => (
      <CheckboxGroup value={record?.true_answer} size="small">
        <Space direction="vertical">
          {Object.keys(listAnswer).map((key, index) => (
            <Checkbox
              value={key}
              key={index}
              style={{ marginBottom: "0.5rem" }}
            >
              <QuestionWrapper
                dangerouslySetInnerHTML={{
                  __html: ALPHABET[index] + ". " + listAnswer[key],
                }}
              />
            </Checkbox>
          ))}
        </Space>
      </CheckboxGroup>
    ),
  },
];

const QuestionDetail = (record) => {
  const dataSource = [
    {
      STT: 1,
      true_answer: record?.true_answer,
      listAnswer: record?.answers,
    },
  ];

  return (
    <Table
      rowKey={(data) => data.STT}
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      scroll={{ x: 800, y: 500 }}
      size="small"
    />
  );
};

export default QuestionDetail;
