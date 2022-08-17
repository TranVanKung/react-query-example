import { useState, useMemo } from "react";
import { Button, Popconfirm, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { PageHeading } from "@/component";
import { actSaveDeleteExamination } from "@/redux/action/teacher/examination";
import {
  actSaveSelectedExamination,
  actSetCreateExaminationStep,
} from "@/redux/action/teacher/examination";
import examinationApi from "@/api/teacher/examination";
import { emptyExamination } from "@/redux/reducer/teacher/examication";
import { ManageExaminationPageWrapper } from "./style";
import ExaminationTable from "./ExaminationTable";

const ManageExaminationPage = (props) => {
  const [selectedRowKeys, onSetSelectedRowKeys] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [isTableLoading, onSetTableLoading] = useState(false);

  const { mutate: actDeleteExamination } = useMutation(
    (body) => examinationApi.deleteExamination(body),
    {
      onSuccess: (res) => {
        if (res?.data) {
          props.actSaveDeleteExamination(selectedRowKeys[0]);
          message.info("Đã xoá kỳ thi");
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

  const history = useHistory();

  const onCreateExam = () => {
    props.actSetCreateExaminationStep(0);
    props.actSaveSelectedExamination(emptyExamination);
    history.push("/teacher/create-examination");
  };

  const isHasSelectedRow = useMemo(
    () => selectedRowKeys.length !== 0,
    [selectedRowKeys]
  );

  const onDeleteExamination = () => {
    actDeleteExamination({ id: selectedRowKeys[0] });
  };

  return (
    <ManageExaminationPageWrapper>
      <div className="heading">
        <PageHeading>Danh sách kỳ thi</PageHeading>

        <div className="extras">
          <Popconfirm
            title={`Bạn có chắc xoá ${selectedRowKeys.length} dữ liệu`}
            onConfirm={onDeleteExamination}
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
        <ExaminationTable
          selectedRowKeys={selectedRowKeys}
          onSetSelectedRowKeys={onSetSelectedRowKeys}
          shouldRefresh={shouldRefresh}
          setShouldRefresh={setShouldRefresh}
          isTableLoading={isTableLoading}
          onSetTableLoading={onSetTableLoading}
        />
      </div>
    </ManageExaminationPageWrapper>
  );
};

export default connect((state) => ({}), {
  actSaveDeleteExamination,
  actSaveSelectedExamination,
  actSetCreateExaminationStep,
})(ManageExaminationPage);
