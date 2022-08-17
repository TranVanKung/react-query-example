import { useState, useMemo } from "react";
import { Button, Popconfirm } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { PageHeading } from "@/component";
import {
  actSetDrawerTeacherVisible,
  actSaveDeleteTeacher,
} from "@/redux/action/admin/teacher";
import { useMutation } from "react-query";
import teacherApi from "@/api/admin/teacher";
import { ManageTeacherPageWrapper } from "./style";
import TeacherTable from "./TeacherTable";
import DrawerTeacher from "./DrawerTeacher";

const ManageTeacherPage = (props) => {
  const [selectedRowKeys, onSetSelectedRowKeys] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [isTableLoading, onSetTableLoading] = useState(false);

  const { mutate: actDeleteTeacher } = useMutation(
    (body) => teacherApi.deleteTeacher(body),
    {
      onSuccess: (res) => {
        if (res?.data) {
          props.actSaveDeleteTeacher(selectedRowKeys[0]);
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

  const onCreateTeacher = () => {
    props.actSetDrawerTeacherVisible(true);
  };

  const onDeleteTeacher = () => {
    actDeleteTeacher({ id: selectedRowKeys[0] });
  };

  const isHasSelectedRow = useMemo(
    () => selectedRowKeys.length !== 0,
    [selectedRowKeys]
  );

  return (
    <ManageTeacherPageWrapper>
      <div className="heading">
        <PageHeading>Danh sách giáo viên</PageHeading>

        <div className="extras">
          <Popconfirm
            title={`Bạn có chắc xoá ${selectedRowKeys.length} dữ liệu`}
            onConfirm={onDeleteTeacher}
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
            onClick={onCreateTeacher}
          >
            Thêm mới
          </Button>
        </div>
      </div>

      <div className="table-wrapper">
        <TeacherTable
          isTableLoading={isTableLoading}
          onSetTableLoading={onSetTableLoading}
          selectedRowKeys={selectedRowKeys}
          onSetSelectedRowKeys={onSetSelectedRowKeys}
          setShouldRefresh={setShouldRefresh}
          shouldRefresh={shouldRefresh}
        />
      </div>

      <DrawerTeacher />
    </ManageTeacherPageWrapper>
  );
};

export default connect((state) => ({}), {
  actSetDrawerTeacherVisible,
  actSaveDeleteTeacher,
})(ManageTeacherPage);
