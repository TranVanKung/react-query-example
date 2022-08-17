import { useState, useMemo } from "react";
import { Button, Popconfirm } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { useMutation } from "react-query";
import { PageHeading } from "@/component";
import examRoomApi from "@/api/teacher/exam-room";
import { actSetModalExamRoomVisible } from "@/redux/action/teacher/examRoom";
import { ManageExamRoomPageWrapper } from "./style";
import ExamRoomTable from "./ExamRoomTable";
import ModalExamRoom from "./ModalExamRoom";

const ManageExamRoomPage = (props) => {
  const [selectedRowKeys, onSetSelectedRowKeys] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [isTableLoading, onSetTableLoading] = useState(false);

  const { mutate: actDeleteExamRoom } = useMutation(
    (body) => examRoomApi.deleteExamRoom(body),
    {
      onSuccess: (res) => {
        if (res?.data) {
          props.actSaveDeleteExamRoom(selectedRowKeys[0]);
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
    props.actSetModalExamRoomVisible(true);
  };

  const onDeleteExamRoom = () => {
    actDeleteExamRoom({ id: selectedRowKeys[0] });
  };

  const isHasSelectedRow = useMemo(
    () => selectedRowKeys.length !== 0,
    [selectedRowKeys]
  );

  return (
    <ManageExamRoomPageWrapper>
      <div className="heading">
        <PageHeading>Danh sách phòng thi</PageHeading>

        <div className="extras">
          <Popconfirm
            title={`Bạn có chắc xoá ${selectedRowKeys.length} dữ liệu`}
            onConfirm={onDeleteExamRoom}
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
        <ExamRoomTable
          isTableLoading={isTableLoading}
          onSetTableLoading={onSetTableLoading}
          selectedRowKeys={selectedRowKeys}
          onSetSelectedRowKeys={onSetSelectedRowKeys}
          setShouldRefresh={setShouldRefresh}
          shouldRefresh={shouldRefresh}
        />
      </div>

      <ModalExamRoom />
    </ManageExamRoomPageWrapper>
  );
};

export default connect((state) => ({}), { actSetModalExamRoomVisible })(
  ManageExamRoomPage
);
