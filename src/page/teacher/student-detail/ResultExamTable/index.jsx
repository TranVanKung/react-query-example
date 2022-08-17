import { useState } from "react";
import { Table, Tag } from "antd";
import { PageHeading } from "@/component";
import { ResultExamTableWrapper } from "./style";

const renderColumns = () => [
  {
    width: "22%",
    title: "Kỳ thi",
    dataIndex: "name",
    key: "name",
    sorter: true,
  },
  {
    title: "Thời gian",
    dataIndex: "duration",
    key: "duration",
    width: "10%",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    width: "15%",
    render: (value, record) => <Tag color={record?.statusColor}>{value}</Tag>,
  },
  {
    title: "Ngày thi",
    dataIndex: "date",
    key: "date",
    width: "18%",
  },
  {
    title: "Điểm",
    dataIndex: "score",
    key: "score",
    width: "8%",
  },
];

const dataSource = [
  {
    id: 1,
    name: "Cuối môn điện lạnh",
    duration: "90 phút",
    status: "Hoàn thành",
    statusColor: "green",
    date: "31/06/2021  09:46",
    score: 98,
  },
  {
    id: 2,
    name: "Cuối môn điện lạnh",
    duration: "90 phút",
    status: "Hoàn thành",
    statusColor: "green",
    date: "31/06/2021  09:46",
    score: 98,
  },
  {
    id: 3,
    name: "Cuối môn điện lạnh",
    duration: "90 phút",
    status: "Bị lỗi",
    statusColor: "red",
    date: "31/06/2021  09:46",
    score: 98,
  },
  {
    id: 4,
    name: "Cuối môn điện lạnh",
    duration: "90 phút",
    status: "Bị lỗi",
    statusColor: "red",
    date: "31/06/2021  09:46",
    score: 98,
  },
  {
    id: 5,
    name: "Cuối môn điện lạnh",
    duration: "90 phút",
    status: "Bị lỗi",
    statusColor: "red",
    date: "31/06/2021  09:46",
    score: 98,
  },
  {
    id: 6,
    name: "Cuối môn điện lạnh",
    duration: "90 phút",
    status: "Bị lỗi",
    statusColor: "red",
    date: "31/06/2021  09:46",
    score: 98,
  },
  {
    id: 7,
    name: "Cuối môn điện lạnh",
    duration: "90 phút",
    status: "Hoàn thành",
    statusColor: "green",
    date: "31/06/2021  09:46",
    score: 98,
  },
  {
    id: 8,
    name: "Cuối môn điện lạnh",
    duration: "90 phút",
    status: "Hoàn thành",
    statusColor: "green",
    date: "31/06/2021  09:46",
    score: 98,
  },
  {
    id: 9,
    name: "Cuối môn điện lạnh",
    duration: "90 phút",
    status: "Hoàn thành",
    statusColor: "green",
    date: "31/06/2021  09:46",
    score: 98,
  },
];

const ResultExamTable = () => {
  const [page, onSetPage] = useState(1);
  const [pageSize, onSetPageSize] = useState(20);
  const [isTableLoading, onSetTableLoading] = useState(false);

  const onShowTotalData = () => {
    return `Có ${dataSource.length} dữ liệu`;
  };

  return (
    <ResultExamTableWrapper>
      <PageHeading>Kết quả thi</PageHeading>

      <Table
        style={{ marginTop: "1rem" }}
        rowKey={(data) => data.STT}
        dataSource={dataSource}
        columns={renderColumns()}
        pagination={{
          pageSize,
          pageSizeOptions: ["10", "20", "30", "40", "50"],
          current: page,
          showTotal: onShowTotalData,
          showSizeChanger: true,
        }}
        scroll={{ y: 500 }}
        loading={isTableLoading}
        size="middle"
      />
    </ResultExamTableWrapper>
  );
};

export default ResultExamTable;
