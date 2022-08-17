import { useState, useEffect } from "react";
import { Table, Input, Button } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { TableFooter } from "@/component";
import { PAGE_SIZE_OPTION } from "@/util/config";
import {
  actSaveSelectedExamination,
  actSaveGetAllExamination,
  actSetExaminationPageSize,
} from "@/redux/action/teacher/examination";
import examinationApi from "@/api/teacher/examination";

const renderColumns = (
  getColumnSearchProps,
  onEditExamination,
  onViewExamination
) => [
  {
    width: "5%",
    title: "STT",
    dataIndex: "STT",
    key: "STT",
  },
  {
    width: "25%",
    title: "Tên kỳ thi",
    dataIndex: "name",
    key: "name",
    ...getColumnSearchProps("name"),
  },
  {
    title: "Môn thi",
    width: "16%",
    dataIndex: "subject",
    key: "subject",
    ...getColumnSearchProps("subject"),
  },
  {
    title: "Năm học",
    width: "12%",
    dataIndex: "academic_year",
    key: "academic_year",
    ...getColumnSearchProps("academic_year"),
  },
  {
    title: "Học kỳ",
    width: "12%",
    dataIndex: "semester",
    key: "semester",
    ...getColumnSearchProps("semester"),
  },
  {
    title: "Tạo ngày",
    width: "18%",
    dataIndex: "created_at",
    key: "created_at",
    render: (created_at) => moment(created_at).format("DD-MM-YYYY HH:mm"),
  },
  {
    title: "",
    dataIndex: "action",
    width: "10%",
    key: "action",
    render: (value, record) => (
      <div>
        <Button
          size="small"
          className="detail-btn"
          onClick={() => onViewExamination(record?.id)}
        >
          Chi tiết
        </Button>
      </div>
    ),
  },
];

const ExaminationTable = (props) => {
  const {
    isTableLoading,
    onSetTableLoading,
    shouldRefresh,
    setShouldRefresh,
    selectedRowKeys,
    onSetSelectedRowKeys,
    listExamination,
    totalData,
    pageSize,
  } = props;

  let searchInput = null;
  const [page, onSetPage] = useState(1);
  const [filterTable, onSetFilterTable] = useState({});
  const [searchText, onSetSearchText] = useState(null);
  const history = useHistory();

  const { mutate: actGetListExamination } = useMutation(
    (params) => examinationApi.getListExamination(params),
    {
      onSuccess: (res) => {
        props.actSaveGetAllExamination(res?.data);
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
      actGetListExamination({ skip: page - 1, limit: pageSize });
    }
  }, [shouldRefresh]);

  useEffect(() => {
    onSetTableLoading(true);
    actGetListExamination({ skip: page - 1, limit: pageSize });
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

  const onEditExamination = (record) => {
    props.actSaveSelectedExamination(record);
  };

  const onViewExamination = (id) => {
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
      props.actSetExaminationPageSize(pagination.pageSize);
    onSetFilterTable(filter);

    actGetListExamination({
      skip: pagination.current - 1,
      limit: pagination.pageSize,
    });
  };

  const onShowTotalData = () => {
    return `Có ${totalData} dữ liệu`;
  };

  const dataSource = listExamination.map((teacher, index) => ({
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
        onEditExamination,
        onViewExamination
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
    listExamination: state.TeacherExamination.listExamination,
    totalData: state.TeacherExamination.totalData,
    pageSize: state.TeacherExamination.pageSize,
  }),
  {
    actSaveSelectedExamination,
    actSaveGetAllExamination,
    actSetExaminationPageSize,
  }
)(ExaminationTable);
