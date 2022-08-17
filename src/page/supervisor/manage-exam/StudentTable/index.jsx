import { useState } from "react";
import { Table, Tag } from "antd";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

const renderColumns = () => [
  {
    width: "8%",
    title: "STT",
    dataIndex: "STT",
    key: "STT",
  },
  {
    width: "25%",
    title: "Tên",
    dataIndex: "name",
    key: "name",
    sorter: true,
  },
  {
    title: "Năm sinh",
    width: "15%",
    dataIndex: "dateOfBirth",
    key: "dateOfBirth",
  },
  {
    title: "Giới tính",
    dataIndex: "gender",
    key: "gender",
    width: "15%",
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
    width: "22%",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: "28%",
  },
  {
    title: "",
    dataIndex: "isSubmited",
    key: "isSubmited",
    width: "15%",
    render: (value, record) => (
      <Tag color={record?.isSubmited ? "green" : "red"}>
        {record?.isSubmited ? "Đã nộp bài" : "Không có bài"}
      </Tag>
    ),
  },
  {
    title: "",
    dataIndex: "isScored",
    key: "isScored",
    width: "15%",
    render: (value, record) => (
      <Tag color={record?.isScored ? "green" : "red"}>
        {record?.isScored ? "Hoàn tất" : "Cầm chấm"}
      </Tag>
    ),
  },
];

const dataSource = [
  {
    STT: 1,
    name: "Phuc Nguyen Thanh",
    dateOfBirth: "30/1/1999",
    gender: "Nam",
    address: "33 nguyễn an ninh",
    email: "Nguyenthanhphuc3001",
    isSubmited: true,
    isScored: false,
  },
  {
    STT: 2,
    name: "Phuc Nguyen Thanh",
    dateOfBirth: "30/1/1999",
    gender: "Nam",
    address: "33 nguyễn an ninh",
    email: "Nguyenthanhphuc3001",
    isSubmited: false,
    isScored: true,
  },
  {
    STT: 3,
    name: "Phuc Nguyen Thanh",
    dateOfBirth: "30/1/1999",
    gender: "Nam",
    address: "33 nguyễn an ninh",
    email: "Nguyenthanhphuc3001",
    isSubmited: true,
    isScored: true,
  },
  {
    STT: 4,
    name: "Phuc Nguyen Thanh",
    dateOfBirth: "30/1/1999",
    gender: "Nam",
    address: "33 nguyễn an ninh",
    email: "Nguyenthanhphuc3001",
    isSubmited: false,
    isScored: false,
  },
  {
    STT: 5,
    name: "Phuc Nguyen Thanh",
    dateOfBirth: "30/1/1999",
    gender: "Nam",
    address: "33 nguyễn an ninh",
    email: "Nguyenthanhphuc3001",
    isSubmited: false,
    isScored: true,
  },
  {
    STT: 6,
    name: "Phuc Nguyen Thanh",
    dateOfBirth: "30/1/1999",
    gender: "Nam",
    address: "33 nguyễn an ninh",
    email: "Nguyenthanhphuc3001",
    isSubmited: true,
    isScored: true,
  },
  {
    STT: 7,
    name: "Phuc Nguyen Thanh",
    dateOfBirth: "30/1/1999",
    gender: "Nam",
    address: "33 nguyễn an ninh",
    email: "Nguyenthanhphuc3001",
    isSubmited: true,
    isScored: true,
  },
  {
    STT: 8,
    name: "Phuc Nguyen Thanh",
    dateOfBirth: "30/1/1999",
    gender: "Nam",
    address: "33 nguyễn an ninh",
    email: "Nguyenthanhphuc3001",
    isSubmited: true,
    isScored: false,
  },
  {
    STT: 9,
    name: "Phuc Nguyen Thanh",
    dateOfBirth: "30/1/1999",
    gender: "Nam",
    address: "33 nguyễn an ninh",
    email: "Nguyenthanhphuc3001",
    isSubmited: false,
    isScored: true,
  },
];

const StudentTable = (props) => {
  const [page, onSetPage] = useState(1);
  const [pageSize, onSetPageSize] = useState(20);
  const [isTableLoading, onSetTableLoading] = useState(false);
  const history = useHistory();

  const onShowTotalData = () => {
    return `Có ${dataSource.length} dữ liệu`;
  };

  return (
    <Table
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
      scroll={{ x: 1100, y: 500 }}
      loading={isTableLoading}
      size="large"
    />
  );
};

export default connect((state) => ({}), {})(StudentTable);
