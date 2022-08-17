import { useState, useEffect } from "react";
import { Table, Input, Button } from "antd";
import { connect } from "react-redux";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { TableFooter } from "@/component";
import { PAGE_SIZE_OPTION } from "@/util/config";
import {
  actSaveSelectedExamRoom,
  actSetModalExamRoomVisible,
  actSaveGetAllExamRoom,
  actSetExamRoomPageSize,
} from "@/redux/action/teacher/examRoom";
import examRoomApi from "@/api/teacher/exam-room";

const renderColumns = (
  getColumnSearchProps,
  onEditExamRoom,
  onViewExamRoom
) => [
  {
    width: "5%",
    title: "STT",
    dataIndex: "STT",
    key: "STT",
  },
  {
    width: "30%",
    title: "Tên phòng thi",
    dataIndex: "name",
    key: "name",
    ...getColumnSearchProps("name"),
  },
  {
    title: "Số học sinh",
    width: "15%",
    dataIndex: "nums_candidates",
    key: "nums_candidates",
  },
  {
    title: "Năm học",
    width: "17%",
    dataIndex: "academic_year",
    key: "academic_year",
  },
  {
    title: "Học kỳ",
    width: "17%",
    dataIndex: "semester",
    key: "semester",
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    render: (value, record) => (
      <div>
        <Button
          size="small"
          className="edit-btn"
          onClick={() => onEditExamRoom(record)}
          style={{ marginRight: "1rem" }}
        >
          Sửa
        </Button>

        <Button
          size="small"
          className="detail-btn"
          onClick={() => onViewExamRoom(record?.id)}
        >
          Chi tiết
        </Button>
      </div>
    ),
  },
];

const ExamRoomTable = (props) => {
  const {
    isTableLoading,
    onSetTableLoading,
    shouldRefresh,
    setShouldRefresh,
    selectedRowKeys,
    onSetSelectedRowKeys,
    listExamRoom,
    totalData,
    pageSize,
  } = props;

  let searchInput = null;
  const [page, onSetPage] = useState(1);
  const [filterTable, onSetFilterTable] = useState({});
  const [searchText, onSetSearchText] = useState(null);
  const history = useHistory();

  const { mutate: actGetListExamRoom } = useMutation(
    (params) => examRoomApi.getListExamRoom(params),
    {
      onSuccess: (res) => {
        props.actSaveGetAllExamRoom(res?.data);
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
      actGetListExamRoom({ skip: page - 1, limit: pageSize });
    }
  }, [shouldRefresh]);

  useEffect(() => {
    onSetTableLoading(true);
    actGetListExamRoom({ skip: page - 1, limit: pageSize });
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

  const onEditExamRoom = (record) => {
    props.actSaveSelectedExamRoom(record);
    props.actSetModalExamRoomVisible(true);
  };

  const onViewExamRoom = (roomId) => {
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
      props.actSetExamRoomPageSize(pagination.pageSize);
    onSetFilterTable(filter);

    actGetListExamRoom({
      skip: pagination.current - 1,
      limit: pagination.pageSize,
    });
  };

  const onShowTotalData = () => {
    return `Có ${totalData} dữ liệu`;
  };

  const dataSource = listExamRoom.map((teacher, index) => ({
    ...teacher,
    STT: (page - 1) * pageSize + index + 1,
  }));

  return (
    <Table
      rowSelection={rowSelection}
      rowKey={(data) => data.id}
      dataSource={dataSource}
      columns={renderColumns(
        getColumnSearchProps,
        onEditExamRoom,
        onViewExamRoom
      )}
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
    listExamRoom: state.TeacherExamRoom.listExamRoom,
    totalData: state.TeacherExamRoom.totalData,
    pageSize: state.TeacherExamRoom.pageSize,
  }),
  {
    actSaveSelectedExamRoom,
    actSetModalExamRoomVisible,
    actSaveGetAllExamRoom,
    actSetExamRoomPageSize,
  }
)(ExamRoomTable);
