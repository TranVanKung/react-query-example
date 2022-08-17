import { useState, useEffect } from "react";
import { Table, Badge, Input, Button } from "antd";
import { connect } from "react-redux";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { TableFooter } from "@/component";
import { PAGE_SIZE_OPTION, EXAM_PAPER_TYPE } from "@/util/config";
import {
  actSaveSelectedExamPaper,
  actSetModalExamPaperVisible,
  actSaveGetAllExamPaper,
  actSetExamPaperPageSize,
} from "@/redux/action/teacher/examPaper";
import examPaperApi from "@/api/teacher/exam-paper";

const renderColumns = (
  getColumnSearchProps,
  onEditExamPaper,
  onViewExamPaper
) => [
  {
    width: "8%",
    title: "STT",
    dataIndex: "STT",
    key: "STT",
  },
  {
    width: "25%",
    title: "Tên đề thi",
    dataIndex: "name",
    key: "name",
    ...getColumnSearchProps("name"),
  },
  {
    title: "Loại đề thi",
    width: "13%",
    dataIndex: "format",
    key: "format",
    ...getColumnSearchProps("format"),
    render: (format) => EXAM_PAPER_TYPE[format.toString()],
  },
  {
    title: "Thang điểm",
    width: "13%",
    dataIndex: "score_level",
    key: "score_level",
    ...getColumnSearchProps("score_level"),
  },
  {
    title: "Bằng điểm nhau?",
    width: "15%",
    dataIndex: "is_equal_score",
    key: "is_equal_score",
    render: (is_equal_score) => (
      <Badge
        status={is_equal_score ? "success" : "error"}
        text={is_equal_score ? "Bằng nhau" : "Không"}
      />
    ),
  },
  {
    title: "Thời gian",
    width: "13%",
    dataIndex: "duration_mins",
    key: "duration_mins",
    ...getColumnSearchProps("duration_mins"),
    render: (value) => `${value} phút`,
  },
  {
    title: "",
    dataIndex: "action",
    width: "15%",
    key: "action",
    render: (value, record) => (
      <div>
        <Button
          size="small"
          className="edit-btn"
          onClick={() => onEditExamPaper(record)}
          style={{ marginRight: "1rem" }}
        >
          Sửa
        </Button>

        <Button
          size="small"
          className="detail-btn"
          onClick={() => onViewExamPaper(record?.id)}
        >
          Chi tiết
        </Button>
      </div>
    ),
  },
];

const ExamPaperTable = (props) => {
  const {
    isTableLoading,
    onSetTableLoading,
    shouldRefresh,
    setShouldRefresh,
    selectedRowKeys,
    onSetSelectedRowKeys,
    listExamPaper,
    totalData,
    pageSize,
  } = props;

  let searchInput = null;
  const [page, onSetPage] = useState(1);
  const [filterTable, onSetFilterTable] = useState({});
  const [searchText, onSetSearchText] = useState(null);
  const history = useHistory();

  const { mutate: actGetListExamPaper } = useMutation(
    (params) => examPaperApi.getListExamPaper(params),
    {
      onSuccess: (res) => {
        props.actSaveGetAllExamPaper(res?.data);
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
      actGetListExamPaper({ skip: page - 1, limit: pageSize });
    }
  }, [shouldRefresh]);

  useEffect(() => {
    onSetTableLoading(true);
    actGetListExamPaper({ skip: page - 1, limit: pageSize });
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

  const onEditExamPaper = (record) => {
    props.actSaveSelectedExamPaper(record);
    props.actSetModalExamPaperVisible(true);
  };

  const onViewExamPaper = (id) => {
    history.push(`/teacher/manage-question?exampPaperId=${id}`);
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
      props.actSetExamPaperPageSize(pagination.pageSize);
    onSetFilterTable(filter);

    actGetListExamPaper({
      skip: pagination.current - 1,
      limit: pagination.pageSize,
    });
  };

  const onShowTotalData = () => {
    return `Có ${totalData} dữ liệu`;
  };

  const dataSource = listExamPaper.map((teacher, index) => ({
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
        onEditExamPaper,
        onViewExamPaper
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
    listExamPaper: state.TeacherExamPaper.listExamPaper,
    totalData: state.TeacherExamPaper.totalData,
    pageSize: state.TeacherExamPaper.pageSize,
  }),
  {
    actSaveSelectedExamPaper,
    actSetModalExamPaperVisible,
    actSaveGetAllExamPaper,
    actSetExamPaperPageSize,
  }
)(ExamPaperTable);
