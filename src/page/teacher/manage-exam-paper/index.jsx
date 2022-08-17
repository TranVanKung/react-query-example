import { useState, useMemo } from "react";
import { Button, Popconfirm, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { useMutation } from "react-query";
import { PageHeading } from "@/component";
import examPaperApi from "@/api/teacher/exam-paper";
import { actSetModalExamPaperVisible } from "@/redux/action/teacher/examPaper";
import { ManageExamPaperPageWrapper } from "./style";
import ExamPaperTable from "./ExamPaperTable";
import ModalExamPaper from "./ModalExamPaper";

const ManageExamPaperPage = (props) => {
  const [selectedRowKeys, onSetSelectedRowKeys] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [isTableLoading, onSetTableLoading] = useState(false);

  const { mutate: actDeleteExamPaper } = useMutation(
    (body) => examPaperApi.deleteExamPaper(body),
    {
      onSuccess: (res) => {
        if (res?.data) {
          props.actSaveDeleteExamPaper(selectedRowKeys[0]);
          message.info("Đã xoá bài thi");
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
    props.actSetModalExamPaperVisible(true);
  };

  const onDeleteExamPaper = () => {
    actDeleteExamPaper({ id: selectedRowKeys[0] });
  };

  const isHasSelectedRow = useMemo(
    () => selectedRowKeys.length !== 0,
    [selectedRowKeys]
  );

  return (
    <ManageExamPaperPageWrapper>
      <div className="heading">
        <PageHeading>Danh sách đề thi</PageHeading>

        <div className="extras">
          <Popconfirm
            title={`Bạn có chắc xoá ${selectedRowKeys.length} dữ liệu`}
            onConfirm={onDeleteExamPaper}
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
        <ExamPaperTable
          isTableLoading={isTableLoading}
          onSetTableLoading={onSetTableLoading}
          selectedRowKeys={selectedRowKeys}
          onSetSelectedRowKeys={onSetSelectedRowKeys}
          setShouldRefresh={setShouldRefresh}
          shouldRefresh={shouldRefresh}
        />
      </div>

      <ModalExamPaper />
    </ManageExamPaperPageWrapper>
  );
};

export default connect((state) => ({}), { actSetModalExamPaperVisible })(
  ManageExamPaperPage
);
