import { useMemo, useState } from "react";
import { Button, Dropdown, Menu, Popconfirm, message } from "antd";
import { useMutation } from "react-query";
import qs from "qs";
import {
  PlusOutlined,
  EyeOutlined,
  DeleteOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { PageHeading, Icon, GoBack } from "@/component";
import {
  actSetDrawerQuestionVisible,
  actSaveSelectedQuestion,
} from "@/redux/action/teacher/question";
import { actSetPreviewExamPaperDrawerOpen } from "@/redux/action/teacher/examPaper";
import questionApi from "@/api/teacher/question";
import { actSaveDeleteQuestion } from "@/redux/action/teacher/question";
import { ManageQuestionPageWrapper, DropItemWrapper } from "./style";
import QuestionTable from "./QuestionTable";
import DrawerPreviewExamPaper from "./DrawerPreviewExamPaper";
import DrawerCreateQuestion from "./DrawerCreateQuestion";

const renderDropDownMenu = (onCreateQuestion, onUploadQuestion) => (
  <Menu>
    <Menu.Item onClick={onUploadQuestion}>
      <DropItemWrapper>
        <Icon name="cloud_upload" />
        <span className="label">Upload File</span>
      </DropItemWrapper>
    </Menu.Item>

    <Menu.Item onClick={onCreateQuestion}>
      <DropItemWrapper>
        <Icon name="edit_note" />
        <span className="label">Nhập thủ công</span>
      </DropItemWrapper>
    </Menu.Item>
  </Menu>
);

const ManageQuestionPage = (props) => {
  const { selectedExam, totalData } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [isTableLoading, onSetTableLoading] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const examPaperId = useMemo(() => {
    const searchQuery = qs.parse(location.search.replace("?", ""));
    return searchQuery?.exampPaperId;
  }, [location]);

  const { mutate: actDeleteQuestion } = useMutation(
    (body) => questionApi.deleteQuestion(body),
    {
      onSuccess: (res) => {
        if (res?.data) {
          props.actSaveDeleteQuestion(selectedRowKeys[0]);
          message.info("Xoá câu hỏi thành công");
        }
      },
      onSettled: () => {
        if (!shouldRefresh) {
          // setShouldRefresh(true);
          setSelectedRowKeys([]);
        }
      },
    }
  );

  const onCreateQuestion = () => {
    props.actSetDrawerQuestionVisible(true);
    props.actSaveSelectedQuestion({});
  };

  const onUploadQuestion = () => {
    history.push("/teacher/upload-question");
  };

  const onPreviewExamPaper = () => {
    props.actSetPreviewExamPaperDrawerOpen(true);
  };

  const onGoback = () => {
    history.push("/teacher/manage-exam-paper");
  };

  const onDeleteQuestion = () => {
    actDeleteQuestion({
      id: selectedRowKeys[0],
      examPaperId: selectedExam?.id,
    });
  };

  const isHasSelectedRow = useMemo(
    () => selectedRowKeys.length !== 0,
    [selectedRowKeys]
  );

  return (
    <ManageQuestionPageWrapper>
      <div className="heading">
        <GoBack onClick={onGoback} />
        <PageHeading>{selectedExam?.name}</PageHeading>

        <div className="extras">
          <Button
            className="ghost-btn"
            size="large"
            icon={<EyeOutlined />}
            style={{ marginRight: "2rem" }}
            onClick={onPreviewExamPaper}
            disabled={totalData === 0}
          >
            Xem trước
          </Button>

          <Popconfirm
            title={`Bạn có chắc xoá ${selectedRowKeys.length} dữ liệu`}
            onConfirm={onDeleteQuestion}
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
            className="download-btn"
            size="large"
            icon={<CloudDownloadOutlined />}
            style={{ marginRight: "2rem" }}
          >
            Tải xuống
          </Button>

          <Dropdown
            overlay={() =>
              renderDropDownMenu(onCreateQuestion, onUploadQuestion)
            }
            placement="bottomCenter"
          >
            <Button
              className="primary-btn"
              type="primary"
              size="large"
              icon={<PlusOutlined />}
            >
              Thêm mới
            </Button>
          </Dropdown>
        </div>
      </div>

      <div className="summary">
        <div className="item">
          <div className="icon">
            <Icon name="help_center" />
          </div>

          <div className="label">{`${totalData} câu hỏi`}</div>
        </div>

        <div className="item">
          <div className="icon">
            <Icon name="alarm" />
          </div>

          <div className="label">{`${selectedExam?.duration_mins} phút`}</div>
        </div>

        <div className="item">
          <div className="icon">
            <Icon name="event" />
          </div>

          <div className="label">{selectedExam?.created_at}</div>
        </div>
      </div>

      <div className="table-wrapper">
        <QuestionTable
          examPaperId={examPaperId}
          isTableLoading={isTableLoading}
          onSetTableLoading={onSetTableLoading}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          setShouldRefresh={setShouldRefresh}
          shouldRefresh={shouldRefresh}
        />
      </div>

      <DrawerPreviewExamPaper />
      <DrawerCreateQuestion examPaperId={examPaperId} />
    </ManageQuestionPageWrapper>
  );
};

export default connect(
  (state) => ({
    selectedExam: state.TeacherQuestion.selectedExam,
    totalData: state.TeacherQuestion.totalData,
  }),
  {
    actSetDrawerQuestionVisible,
    actSetPreviewExamPaperDrawerOpen,
    actSaveSelectedQuestion,
    actSaveDeleteQuestion,
  }
)(ManageQuestionPage);
