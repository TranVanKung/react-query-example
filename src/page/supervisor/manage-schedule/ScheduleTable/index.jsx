import { useState } from "react";
import { Table, Tag, Menu, Dropdown } from "antd";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { EyeOutlined, AuditOutlined } from "@ant-design/icons";
import { Icon } from "@/component";

const renderMenu = (onViewSchedule, onSupervise, record) => (
  <Menu>
    <Menu.Item icon={<EyeOutlined />} onClick={() => onViewSchedule(record)}>
      Xem thêm
    </Menu.Item>

    <Menu.Item icon={<AuditOutlined />} onClick={onSupervise}>
      Vào giám thi
    </Menu.Item>
  </Menu>
);

const renderColumns = (onViewSchedule, onSupervise) => [
  {
    width: "5%",
    title: "STT",
    dataIndex: "STT",
    key: "STT",
  },
  {
    width: "20%",
    title: "Tên kỳ thi",
    dataIndex: "examName",
    key: "examName",
    sorter: true,
  },
  {
    title: "Tên bài thi",
    width: "18%",
    dataIndex: "testName",
    key: "testName",
  },
  {
    title: "Giám thị",
    dataIndex: "supervisor",
    key: "supervisor",
    width: "16%",
  },
  {
    title: "Thời gian",
    dataIndex: "duration",
    key: "duration",
    width: "13%",
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
    width: "16%",
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    width: "5%",
    render: (value, record) => (
      <Dropdown overlay={renderMenu(onViewSchedule, onSupervise, record)}>
        <span>
          <Icon name="more_vert" />
        </span>
      </Dropdown>
    ),
  },
];

const dataSource = [
  {
    STT: 1,
    examName: "Cuộc thi vào lớp 10",
    testName: "Thi toán 1 tiết",
    supervisor: "Đinh Thị Hương",
    duration: "90 phút",
    status: "Hoàn thành",
    statusColor: "green",
    date: "31/06/2021  09:46",
  },
  {
    STT: 2,
    examName: "Cuộc thi vào lớp 10",
    testName: "Thi toán 1 tiết",
    supervisor: "Đinh Thị Hương",
    duration: "90 phút",
    status: "Bị lỗi",
    statusColor: "red",
    date: "31/06/2021  09:46",
  },
  {
    STT: 3,
    examName: "Cuộc thi vào lớp 10",
    testName: "Thi toán 1 tiết",
    supervisor: "Đinh Thị Hương",
    duration: "90 phút",
    status: "Sắp diễn ra",
    statusColor: "purple",
    date: "31/06/2021  09:46",
  },
  {
    STT: 4,
    examName: "Cuộc thi vào lớp 10",
    testName: "Thi toán 1 tiết",
    supervisor: "Đinh Thị Hương",
    duration: "90 phút",
    status: "Hoàn thành",
    statusColor: "green",
    date: "31/06/2021  09:46",
  },
  {
    STT: 5,
    examName: "Cuộc thi vào lớp 10",
    testName: "Thi toán 1 tiết",
    supervisor: "Đinh Thị Hương",
    duration: "90 phút",
    status: "Hoàn thành",
    statusColor: "green",
    date: "31/06/2021  09:46",
  },
  {
    STT: 6,
    examName: "Cuộc thi vào lớp 10",
    testName: "Thi toán 1 tiết",
    supervisor: "Đinh Thị Hương",
    duration: "90 phút",
    status: "Hoàn thành",
    statusColor: "green",
    date: "31/06/2021  09:46",
  },
  {
    STT: 7,
    examName: "Cuộc thi vào lớp 10",
    testName: "Thi toán 1 tiết",
    supervisor: "Đinh Thị Hương",
    duration: "90 phút",
    status: "Sắp diễn ra",
    statusColor: "purple",
    date: "31/06/2021  09:46",
  },
  {
    STT: 8,
    examName: "Cuộc thi vào lớp 10",
    testName: "Thi toán 1 tiết",
    supervisor: "Đinh Thị Hương",
    duration: "90 phút",
    status: "Sắp diễn ra",
    statusColor: "purple",
    date: "31/06/2021  09:46",
  },
  {
    STT: 9,
    examName: "Cuộc thi vào lớp 10",
    testName: "Thi toán 1 tiết",
    supervisor: "Đinh Thị Hương",
    duration: "90 phút",
    status: "Sắp diễn ra",
    statusColor: "purple",
    date: "31/06/2021  09:46",
  },
];

const ScheduleTable = (props) => {
  const [page, onSetPage] = useState(1);
  const [pageSize, onSetPageSize] = useState(20);
  const [isTableLoading, onSetTableLoading] = useState(false);
  const history = useHistory();

  const onShowTotalData = () => {
    return `Có ${dataSource.length} dữ liệu`;
  };

  const onViewSchedule = (record) => {
    history.push("/supervisor/manage-exam");
  };

  const onSupervise = (record) => {};

  return (
    <Table
      rowKey={(data) => data.STT}
      dataSource={dataSource}
      columns={renderColumns(onViewSchedule, onSupervise)}
      pagination={{
        pageSize,
        pageSizeOptions: ["10", "20", "30", "40", "50"],
        current: page,
        showTotal: onShowTotalData,
        showSizeChanger: true,
      }}
      scroll={{ x: 1000, y: 500 }}
      loading={isTableLoading}
      size="middle"
    />
  );
};

export default connect((state) => ({}), {})(ScheduleTable);
