import { Drawer } from "antd";
import { connect } from "react-redux";
import { actSetPreviewExamPaperDrawerOpen } from "@/redux/action/teacher/examPaper";
import { Icon, ExamPaperDetail } from "@/component";
import { DrawerHeadingWrapper, DrawerContentWrapper } from "./style";

let DrawerHeading = (props) => {
  const { selectedExam, totalData } = props;

  return (
    <DrawerHeadingWrapper>
      <span className="title">{selectedExam?.name}</span>

      <span className="summary">
        <div className="item">
          <div className="icon">
            <Icon name="help_center" />
          </div>

          <div className="label">{totalData} câu hỏi</div>
        </div>

        <div className="item">
          <div className="icon">
            <Icon name="alarm" />
          </div>

          <div className="label">{selectedExam?.duration_mins} phút</div>
        </div>

        <div className="item">
          <div className="icon">
            <Icon name="event" />
          </div>

          <div className="label">{selectedExam?.created_at}</div>
        </div>
      </span>
    </DrawerHeadingWrapper>
  );
};

DrawerHeading = connect((state) => ({
  selectedExam: state.TeacherQuestion.selectedExam,
  totalData: state.TeacherQuestion.totalData,
}))(DrawerHeading);

const DrawerPreviewTest = (props) => {
  const { isPreviewDrawerVisible } = props;

  const onCloseDrawer = () => {
    props.actSetPreviewExamPaperDrawerOpen(false);
  };

  return (
    <Drawer
      title={<DrawerHeading />}
      onClose={onCloseDrawer}
      visible={isPreviewDrawerVisible}
      maskClosable={false}
      width="100%"
      placement="right"
      style={{ padding: 0 }}
      className="preview-test-drawer"
    >
      <DrawerContentWrapper>
        <ExamPaperDetail isPreviewing={true} />
      </DrawerContentWrapper>
    </Drawer>
  );
};

export default connect(
  (state) => ({
    isPreviewDrawerVisible: state.TeacherExamPaper.isPreviewDrawerVisible,
  }),
  { actSetPreviewExamPaperDrawerOpen }
)(DrawerPreviewTest);
