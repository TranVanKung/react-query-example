import { useState, useEffect, useMemo } from "react";
import { Table, Input, Button } from "antd";
import { connect } from "react-redux";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { TableFooter } from "@/component";
import { PAGE_SIZE_OPTION } from "@/util/config";
import {
  actSaveSelectedStudent,
  actSetModalStudentVisible,
  actSaveGetAllStudent,
  actSetStudentPageSize,
} from "@/redux/action/teacher/student";
import studentApi from "@/api/teacher/student";

const renderColumns = (getColumnSearchProps, onEditStudent, onViewStudent) => [
  {
    width: "8%",
    title: "STT",
    dataIndex: "STT",
    key: "STT",
  },
  {
    width: "30%",
    title: "Tên thí sinh",
    dataIndex: "name",
    key: "name",
    ...getColumnSearchProps("name"),
  },
  {
    title: "Email",
    width: "30%",
    dataIndex: "email",
    key: "email",
    ...getColumnSearchProps("email"),
  },
  {
    title: "Số điện thoại",
    width: "15%",
    dataIndex: "phone_number",
    key: "phone_number",
    ...getColumnSearchProps("phone_number"),
  },
  {
    title: "Giới tính",
    width: "10%",
    dataIndex: "gender",
    key: "gender",
    render: (gender) => (gender === 0 ? "Nữ" : "Nam"),
  },
  {
    title: "Ngày sinh",
    width: "15%",
    dataIndex: "date_of_birth",
    key: "date_of_birth",
    ...getColumnSearchProps("date_of_birth"),
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    fixed: "right",
    width: "14%",
    render: (value, record) => (
      <div style={{ display: "flex" }}>
        <Button
          size="small"
          className="edit-btn"
          onClick={() => onEditStudent(record)}
          style={{ marginRight: "1rem" }}
        >
          Sửa
        </Button>

        <Button
          size="small"
          className="detail-btn"
          onClick={() => onViewStudent(record?.id)}
        >
          Chi tiết
        </Button>
      </div>
    ),
  },
];

const StudentTable = (props) => {
  const {
    isTableLoading,
    onSetTableLoading,
    shouldRefresh,
    setShouldRefresh,
    selectedRowKeys,
    onSetSelectedRowKeys,
    listStudent,
    totalData,
    pageSize,
    roomId,
  } = props;

  let searchInput = null;
  const [page, onSetPage] = useState(1);
  const [filterTable, onSetFilterTable] = useState({});
  const [searchText, onSetSearchText] = useState(null);
  const history = useHistory();

  const { mutate: actGetListStudent } = useMutation(
    (params) => studentApi.getListStudent(params),
    {
      onSuccess: (res) => {
        props.actSaveGetAllStudent(res?.data);
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
    if (shouldRefresh && roomId) {
      onSetTableLoading(true);
      actGetListStudent({ skip: page - 1, limit: pageSize, roomId });
    }
  }, [shouldRefresh, roomId]);

  useEffect(() => {
    if (roomId) {
      onSetTableLoading(true);
      actGetListStudent({ skip: page - 1, limit: pageSize, roomId });
    }
  }, [roomId]);

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

  const onEditStudent = (record) => {
    props.actSaveSelectedStudent(record);
    props.actSetModalStudentVisible(true);
  };

  const onViewStudent = (roomId) => {
    history.push(`/teacher/manage-student?roomId=${roomId}`);
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
      props.actSetStudentPageSize(pagination.pageSize);
    onSetFilterTable(filter);

    actGetListStudent({
      skip: pagination.current - 1,
      limit: pagination.pageSize,
      roomId,
    });
  };

  const onShowTotalData = () => {
    return `Có ${totalData} dữ liệu`;
  };

  const dataSource = useMemo(() => {
    return listStudent.map((teacher, index) => ({
      ...teacher,
      STT: (page - 1) * pageSize + index + 1,
    }));
  }, [listStudent]);

  return (
    <Table
      rowSelection={rowSelection}
      rowKey={(data) => data.id}
      dataSource={dataSource}
      columns={renderColumns(
        getColumnSearchProps,
        onEditStudent,
        onViewStudent
      )}
      pagination={{
        total: totalData,
        pageSize,
        pageSizeOptions: PAGE_SIZE_OPTION,
        current: page,
        showTotal: onShowTotalData,
        showSizeChanger: true,
      }}
      scroll={{ x: 1200, y: 500 }}
      loading={isTableLoading}
      onChange={onTableChange}
      size="middle"
      footer={
        selectedRowKeys?.length > 0
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
    listStudent: state.TeacherStudent.listStudent,
    totalData: state.TeacherStudent.totalData,
    pageSize: state.TeacherStudent.pageSize,
  }),
  {
    actSaveSelectedStudent,
    actSetModalStudentVisible,
    actSaveGetAllStudent,
    actSetStudentPageSize,
  }
)(StudentTable);
