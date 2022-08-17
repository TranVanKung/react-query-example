import { useState, useEffect } from "react";
import { Table, Button, Input, Badge } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";
import teacherApi from "@/api/admin/teacher";
import { connect } from "react-redux";
import { TableFooter } from "@/component";
import { PAGE_SIZE_OPTION } from "@/util/config";
import {
  actSaveSelectedTeacher,
  actSetDrawerTeacherVisible,
  actSaveGetAllTeacher,
  actSetPageSize,
} from "@/redux/action/admin/teacher";

const renderColumns = (getColumnSearchProps, onEditTeacher) => [
  {
    width: "5%",
    title: "STT",
    dataIndex: "STT",
    key: "STT",
  },
  {
    width: "30%",
    title: "Họ và tên",
    dataIndex: "name",
    key: "name",
    ...getColumnSearchProps("display_name"),
    render: (value, record) => (
      <div>
        <div style={{ fontWeight: 500 }}>{record?.display_name}</div>
        <div
          style={{ fontSize: "1.4rem", color: "var(--color-text-secondary)" }}
        >
          {record?.email}
        </div>
      </div>
    ),
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone_number",
    key: "phone_number",
    width: "20%",
    ...getColumnSearchProps("phone_number"),
  },
  {
    title: "Đã active chưa?",
    dataIndex: "is_active",
    key: "is_active",
    width: "20%",
    render: (is_active) => (
      <Badge
        status={is_active ? "success" : "error"}
        text={is_active ? "Đã active" : "Chưa"}
      />
    ),
  },
  {
    title: "Đã xác thực email?",
    dataIndex: "email_verified",
    key: "email_verified",
    width: "20%",
    render: (email_verified) => (
      <Badge
        status={email_verified ? "success" : "error"}
        text={email_verified ? "Đã xác thực" : "Chưa"}
      />
    ),
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    width: "10%",
    render: (value, record) => (
      <div>
        <Button
          size="small"
          className="edit-btn"
          onClick={() => onEditTeacher(record)}
        >
          Chi tiết
        </Button>
      </div>
    ),
  },
];

const TeacherTable = (props) => {
  const {
    isTableLoading,
    onSetTableLoading,
    shouldRefresh,
    setShouldRefresh,
    selectedRowKeys,
    onSetSelectedRowKeys,
    listTeacher,
    totalData,
    pageSize,
  } = props;

  let searchInput = null;
  const [page, onSetPage] = useState(1);
  const [filterTable, onSetFilterTable] = useState({});
  const [searchText, onSetSearchText] = useState(null);

  const { mutate: actGetListTeacher } = useMutation(
    (params) => teacherApi.getListTeacher(params),
    {
      onSuccess: (res) => {
        props.actSaveGetAllTeacher(res?.data);
      },
      onSettled: () => {
        onSetTableLoading(false);

        if (shouldRefresh) {
          setShouldRefresh(false);
        }
      },
    }
  );

  useEffect(() => {
    if (shouldRefresh) {
      onSetTableLoading(true);
      actGetListTeacher({ skip: page - 1, limit: pageSize });
    }
  }, [shouldRefresh]);

  useEffect(() => {
    onSetTableLoading(true);
    actGetListTeacher({ skip: page - 1, limit: pageSize });
  }, []);

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
  };

  const handleReset = (clearFilters) => {
    clearFilters();
  };

  const getColumnSearchProps = () => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
          placeholder="Tìm kiếm"
          ref={(node) => {
            searchInput = node;
          }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm)}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Tìm kiếm
        </Button>

        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) => value.toString(),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: (text) => {
      return (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          autoEscape
          searchWords={[searchText]}
          textToHighlight={text ? text.toString() : ""}
        />
      );
    },
  });

  const onEditTeacher = (record) => {
    props.actSaveSelectedTeacher(record);
    props.actSetDrawerTeacherVisible(true);
  };

  const onRowSelectionChange = (selectedKeys) => {
    onSetSelectedRowKeys(selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onRowSelectionChange,
    selections: [
      {
        key: Table.SELECTION_ALL,
        text: "Chọn tất cả",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            return true;
          });
          onSetSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
    type: "radio",
  };

  const onTableChange = (pagination, filter) => {
    pagination.current !== page && onSetPage(pagination.current);
    pagination.pageSize !== pageSize &&
      props.actSetPageSize(pagination.pageSize);
    onSetFilterTable(filter);

    actGetListTeacher({
      skip: pagination.current - 1,
      limit: pagination.pageSize,
    });
  };

  const onShowTotalData = () => {
    return `Có ${totalData} dữ liệu`;
  };

  const dataSource = listTeacher.map((teacher, index) => ({
    ...teacher,
    STT: (page - 1) * pageSize + index + 1,
  }));

  return (
    <Table
      rowSelection={rowSelection}
      rowKey={(data) => data.id}
      dataSource={dataSource}
      columns={renderColumns(getColumnSearchProps, onEditTeacher)}
      pagination={{
        total: totalData,
        pageSize,
        pageSizeOptions: PAGE_SIZE_OPTION,
        current: page,
        showTotal: onShowTotalData,
        showSizeChanger: true,
      }}
      scroll={{ x: 1000, y: 500 }}
      loading={isTableLoading}
      onChange={onTableChange}
      size="middle"
      footer={
        selectedRowKeys.length > 0
          ? () => (
              <TableFooter>{`Bạn đã chọn ${selectedRowKeys.length} dữ liệu`}</TableFooter>
            )
          : null
      }
    />
  );
};

export default connect(
  (state) => ({
    listTeacher: state.AdminTeacher.listTeacher,
    totalData: state.AdminTeacher.totalData,
    pageSize: state.AdminTeacher.pageSize,
  }),
  {
    actSaveSelectedTeacher,
    actSetDrawerTeacherVisible,
    actSaveGetAllTeacher,
    actSetPageSize,
  }
)(TeacherTable);
