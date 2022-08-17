import { useState, useEffect, useMemo } from "react";
import { Table, Input, Button } from "antd";
import { connect } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { Icon } from "@/component";
import { ALPHABET } from "@/util/config";
import questionApi from "@/api/teacher/question";
import {
  actSaveGetAllQuestion,
  actSaveSelectedQuestion,
  actSetDrawerQuestionVisible,
} from "@/redux/action/teacher/question";
import QuestionDetail from "./QuestionDetail";
import { QuestionWrapper } from "./style";

const renderColumns = (getColumnSearchProps, onEditQuestion) => [
  {
    width: "5%",
    title: "STT",
    dataIndex: "STT",
    key: "STT",
  },
  {
    width: "55%",
    title: "Câu hỏi",
    dataIndex: "question_detail",
    key: "question_detail",
    ...getColumnSearchProps("question_detail"),
    render: (value) => (
      <QuestionWrapper dangerouslySetInnerHTML={{ __html: value }} />
    ),
  },
  {
    title: "Đáp án đúng",
    width: "15%",
    dataIndex: "true_answer",
    key: "true_answer",
    render: (value, record) => (
      <QuestionWrapper
        dangerouslySetInnerHTML={{
          __html: value
            .split(",")
            .map((trueAnswer) => ALPHABET[trueAnswer])
            .join(", "),
        }}
      />
    ),
  },
  {
    title: "Số câu trả lời",
    width: "13%",
    dataIndex: "noOfAnswer",
    key: "noOfAnswer",
    render: (value, record) => Object.keys(record?.answers).length,
  },
  {
    title: "",
    dataIndex: "action",
    width: "8%",
    key: "action",
    render: (value, record) => (
      <div>
        <Button
          size="small"
          className="edit-btn"
          onClick={() => onEditQuestion(record)}
          style={{ marginRight: "1rem" }}
        >
          Sửa
        </Button>
      </div>
    ),
  },
];

const QuestionTable = (props) => {
  const {
    listQuestion,
    totalData,
    examPaperId,
    setShouldRefresh,
    selectedRowKeys,
    setSelectedRowKeys,
    isTableLoading,
    onSetTableLoading,
  } = props;

  let searchInput = null;
  const [page, onSetPage] = useState(1);
  const [pageSize, onSetPageSize] = useState(20);
  const [searchText, onSetSearchText] = useState(null);
  const history = useHistory();

  const { mutate: actGetListQuestion } = useMutation(
    (params) => questionApi.getExamPaperDetail(params),
    {
      onSuccess: (res) => {
        props.actSaveGetAllQuestion(res?.data);
      },
      onSettled: () => {
        onSetTableLoading(false);
      },
    }
  );

  useEffect(() => {
    if (examPaperId) {
      actGetListQuestion(examPaperId);
    }
  }, [examPaperId]);

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

  const onEditQuestion = (record) => {
    props.actSaveSelectedQuestion(record);
    props.actSetDrawerQuestionVisible(true);
  };

  const onRowSelectionChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
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
          onRowSelectionChange(newSelectedRowKeys);
        },
      },
    ],
    type: "radio",
  };

  const onShowTotalData = () => {
    return `Có ${dataSource.length} dữ liệu`;
  };

  const dataSource = useMemo(() => {
    return listQuestion.map((question, index) => ({
      ...question,
      STT: (page - 1) * pageSize + index + 1,
    }));
  }, [listQuestion]);

  return (
    <Table
      rowSelection={rowSelection}
      rowKey={(data) => data.id}
      dataSource={dataSource}
      columns={renderColumns(getColumnSearchProps, onEditQuestion)}
      pagination={{
        total: totalData,
        pageSize,
        current: page,
        showTotal: onShowTotalData,
        showSizeChanger: true,
      }}
      scroll={{ x: 1000, y: 500 }}
      loading={isTableLoading}
      size="middle"
      expandable={{
        expandedRowRender: QuestionDetail,
        expandIcon: ({ expanded, onExpand, record }) =>
          expanded ? (
            <span
              onClick={(e) => onExpand(record, e)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                name="expand_less"
                style={{
                  fontSize: "1.9rem",
                  cursor: "pointer",
                  color: "var(--color-text-secondary)",
                }}
              />
            </span>
          ) : (
            <span
              onClick={(e) => onExpand(record, e)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                name="expand_more"
                style={{
                  fontSize: "1.9rem",
                  cursor: "pointer",
                  color: "var(--color-text-secondary)",
                }}
              />
            </span>
          ),
      }}
    />
  );
};

export default connect(
  (state) => ({
    listQuestion: state.TeacherQuestion.listQuestion,
    totalData: state.TeacherQuestion.totalData,
  }),
  {
    actSaveGetAllQuestion,
    actSaveSelectedQuestion,
    actSetDrawerQuestionVisible,
  }
)(QuestionTable);
