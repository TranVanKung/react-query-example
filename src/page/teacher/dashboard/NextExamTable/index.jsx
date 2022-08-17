import { useState } from "react";
import { Table, Tag } from "antd";
import { PageHeading } from "@/component";
import { NextExamTableWrapper } from "./style";

const renderColumns = () => [
  {
    width: "22%",
    title: "Têb kỳ thi",
    dataIndex: "name",
    key: "name",
    sorter: true,
  },
  {
    title: "Ngày thi",
    dataIndex: "date",
    key: "date",
    width: "15%",
  },
  {
    title: "Thời gian",
    dataIndex: "duration",
    key: "duration",
    width: "10%",
    render: (value) => (
      <Tag color="orange" style={{ borderRadius: "8px" }}>
        {value}
      </Tag>
    ),
  },
];

const dataSource = [
  {
    id: 1,
    name: "Cuối môn điện lạnh",
    duration: "90 phút",
    date: "31/06/2021  09:46",
  },
  {
    id: 2,
    name: "Cuối môn điện lạnh",
    duration: "90 phút",
    date: "31/06/2021  09:46",
  },
  {
    id: 3,
    name: "Cuối môn điện lạnh",
    duration: "90 phút",
    date: "31/06/2021  09:46",
  },
  {
    id: 4,
    name: "Cuối môn điện lạnh",
    duration: "90 phút",
    date: "31/06/2021  09:46",
  },
  {
    id: 5,
    name: "Cuối môn điện lạnh",
    duration: "90 phút",
    date: "31/06/2021  09:46",
  },
  {
    id: 6,
    name: "Cuối môn điện lạnh",
    duration: "90 phút",
    date: "31/06/2021  09:46",
  },
  {
    id: 7,
    name: "Cuối môn điện lạnh",
    duration: "90 phút",
    date: "31/06/2021  09:46",
  },
  {
    id: 8,
    name: "Cuối môn điện lạnh",
    duration: "90 phút",
    date: "31/06/2021  09:46",
  },
  {
    id: 9,
    name: "Cuối môn điện lạnh",
    duration: "90 phút",
    date: "31/06/2021  09:46",
  },
];

const NextExamTable = () => {
  const [page, onSetPage] = useState(1);
  const [pageSize, onSetPageSize] = useState(20);
  const [isTableLoading, onSetTableLoading] = useState(false);

  const onShowTotalData = () => {
    return `Có ${dataSource.length} dữ liệu`;
  };

  return (
    <NextExamTableWrapper>
      <PageHeading>Kỳ thi sắp diễn ra</PageHeading>

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
    </NextExamTableWrapper>
  );
};

export default NextExamTable;
