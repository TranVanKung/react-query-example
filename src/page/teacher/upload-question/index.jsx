import { Steps } from "antd";
import { UploadQuestionPageWrapper } from "./style";
import UploadForm from "./UploadForm";
import ExamPaperDetail from "@/component/ExamPaperDetail";

const { Step } = Steps;

const UploadQuestionPage = () => {
  return (
    <UploadQuestionPageWrapper>
      <div className="step-wrapper">
        <Steps size="default" current={1}>
          <Step title="Chọn file và tải lên" />
          <Step title="Chọn đáp án" />
          <Step title="Hoàn thành" />
        </Steps>
      </div>

      <div className="test-detail">
        <ExamPaperDetail />
      </div>

      {/* <div className="upload-form">
        <UploadForm />
      </div> */}
    </UploadQuestionPageWrapper>
  );
};

export default UploadQuestionPage;
