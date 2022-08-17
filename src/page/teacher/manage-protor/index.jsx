import { useState, useMemo } from "react";
import { Button, Popconfirm } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { useMutation } from "react-query";
import { PageHeading } from "@/component";
import protorApi from "@/api/teacher/protor";
import { actSetModalProtorVisible } from "@/redux/action/teacher/protor";
import { ManageProtorPageWrapper } from "./style";
import ProtorTable from "./ProtorTable";
import ModalProtor from "./ModalProtor";

const ManageProtorPage = (props) => {
  const [selectedRowKeys, onSetSelectedRowKeys] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [isTableLoading, onSetTableLoading] = useState(false);

  const { mutate: actDeleteProtor } = useMutation(
    (body) => protorApi.deleteProtor(body),
    {
      onSuccess: (res) => {
        if (res?.data) {
          props.actSaveDeleteProtor(selectedRowKeys[0]);
        }
      },
      onSettled: () => {
        if (!shouldRefresh) {
          setShouldRefresh(true);
          onSetSelectedRowKeys([]);
        }
      },
    }
  );

  const onCreateExam = () => {
    props.actSetModalProtorVisible(true);
  };

  const onDeleteProtor = () => {
    actDeleteProtor({ id: selectedRowKeys[0] });
  };

  const isHasSelectedRow = useMemo(
    () => selectedRowKeys.length !== 0,
    [selectedRowKeys]
  );

  return (
    <ManageProtorPageWrapper>
      <div className="heading">
        <PageHeading>Danh sách giám thị</PageHeading>

        <div className="extras">
          <Popconfirm
            title={`Bạn có chắc xoá ${selectedRowKeys.length} dữ liệu`}
            onConfirm={onDeleteProtor}
            okText="Có"
            cancelText="Không"
            disabled={!isHasSelectedRow}
          >
            <Button
              className={isHasSelectedRow ? "delete-btn" : "delete-btn disable"}
              size="large"
              style={{
                marginRight: "var(--margin-right)",
              }}
              icon={<DeleteOutlined />}
            >
              Xoá
            </Button>
          </Popconfirm>

          <Button
            className="primary-btn"
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={onCreateExam}
          >
            Thêm mới
          </Button>
        </div>
      </div>

      <div className="table-wrapper">
        <ProtorTable
          isTableLoading={isTableLoading}
          onSetTableLoading={onSetTableLoading}
          selectedRowKeys={selectedRowKeys}
          onSetSelectedRowKeys={onSetSelectedRowKeys}
          setShouldRefresh={setShouldRefresh}
          shouldRefresh={shouldRefresh}
        />
      </div>

      <ModalProtor />
    </ManageProtorPageWrapper>
  );
};

export default connect((state) => ({}), { actSetModalProtorVisible })(
  ManageProtorPage
);
