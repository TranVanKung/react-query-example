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
  actSaveSelectedProtor,
  actSetModalProtorVisible,
  actSaveGetAllProtor,
  actSetProtorPageSize,
} from "@/redux/action/teacher/protor";
import protorApi from "@/api/teacher/protor";

const renderColumns = (getColumnSearchProps, onEditProtor) => [
  {
    width: "8%",
    title: "STT",
    dataIndex: "STT",
    key: "STT",
  },
  {
    width: "30%",
    title: "Họ và tên",
    dataIndex: "name",
    key: "name",
    ...getColumnSearchProps("name"),
  },
  {
    title: "Email",
    width: "35%",
    dataIndex: "email",
    key: "email",
    ...getColumnSearchProps("email"),
  },
  {
    title: "Số điện thoại",
    width: "20%",
    dataIndex: "phone_number",
    key: "phone_number",
    ...getColumnSearchProps("phone_number"),
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    width: "15%",
    render: (value, record) => (
      <div style={{ display: "flex" }}>
        <Button
          size="small"
          className="detail-btn"
          onClick={() => onEditProtor(record)}
        >
          Chi tiết
        </Button>
      </div>
    ),
  },
];

const ProtorTable = (props) => {
  const {
    isTableLoading,
    onSetTableLoading,
    shouldRefresh,
    setShouldRefresh,
    selectedRowKeys,
    onSetSelectedRowKeys,
    listProtor,
    totalData,
    pageSize,
  } = props;

  let searchInput = null;
  const [page, onSetPage] = useState(1);
  const [filterTable, onSetFilterTable] = useState({});
  const [searchText, onSetSearchText] = useState(null);
  const history = useHistory();

  const { mutate: actGetListProtor } = useMutation(
    (params) => protorApi.getListProtor(params),
    {
      onSuccess: (res) => {
        props.actSaveGetAllProtor(res?.data);
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
      actGetListProtor({ skip: page - 1, limit: pageSize });
    }
  }, [shouldRefresh]);

  useEffect(() => {
    onSetTableLoading(true);
    actGetListProtor({ skip: page - 1, limit: pageSize });
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

  const onEditProtor = (record) => {
    props.actSaveSelectedProtor(record);
    props.actSetModalProtorVisible(true);
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
      props.actSetProtorPageSize(pagination.pageSize);
    onSetFilterTable(filter);

    actGetListProtor({
      skip: pagination.current - 1,
      limit: pagination.pageSize,
    });
  };

  const onShowTotalData = () => {
    return `Có ${totalData} dữ liệu`;
  };

  const dataSource = useMemo(() => {
    return listProtor.map((teacher, index) => ({
      ...teacher,
      STT: (page - 1) * pageSize + index + 1,
    }));
  }, [listProtor]);

  return (
    <Table
      rowSelection={rowSelection}
      rowKey={(data) => data.id}
      dataSource={dataSource}
      columns={renderColumns(getColumnSearchProps, onEditProtor)}
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
    listProtor: state.TeacherProtor.listProtor,
    totalData: state.TeacherProtor.totalData,
    pageSize: state.TeacherProtor.pageSize,
  }),
  {
    actSaveSelectedProtor,
    actSetModalProtorVisible,
    actSaveGetAllProtor,
    actSetProtorPageSize,
  }
)(ProtorTable);
