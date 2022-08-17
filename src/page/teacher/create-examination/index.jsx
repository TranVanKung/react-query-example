import { useState } from "react";
import { Steps, Row, Button } from "antd";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { actSetCreateExaminationStep } from "@/redux/action/teacher/examination";
import examinationApi from "@/api/teacher/examination";
import { CreateExamPageWrapper } from "./style";
import AdvanceExamConfig from "./AdvanceExamConfig";
import BasicExamConfig from "./BasicExamConfig";
import SuccessfulMessage from "./SuccessfulMessage";

const { Step } = Steps;

const CreateExamPage = (props) => {
  const { currentStep, listExamRoom, selectedExamination } = props;

  const [shouldSubmitFirstStep, setSubmitFirstStep] = useState(false);
  const [shouldSubmitSecondStep, setSubmitSecondStep] = useState(false);
  const history = useHistory();

  const { mutate: actCreateExamination } = useMutation(
    (body) => examinationApi.createExamination(body),
    {
      onSuccess: (res) => {
        if (!res?.error) {
          onCompleteCreateExamination();
        }
      },
    }
  );

  const onNextStep = () => {
    if (currentStep === 0) {
      setSubmitFirstStep(true);
    } else {
      setNextStep();
    }
  };

  const onCompleteCreateExamination = () => {
    props.actSetCreateExaminationStep(2);
  };

  const onCreateExam = () => {
    const requestBody = {
      name: selectedExamination?.name,
      description: selectedExamination?.description,
      subject: selectedExamination?.subject,
      status: 0,
      academic_year: selectedExamination?.academic_year,
      semester: selectedExamination?.semester,
      exam_configuration: {
        duration_mins: selectedExamination?.exam_configuration?.duration_mins,
        enable_reminder:
          selectedExamination?.exam_configuration?.enable_reminder,
        shuffle_question:
          selectedExamination?.exam_configuration?.shuffle_question,
        shuffle_answer: selectedExamination?.exam_configuration?.shuffle_answer,
      },
      scheduled_exam_rooms: listExamRoom.map((item) => ({
        exam_room_id: item?.exam_room_id,
        start_time: item?.start_time,
        exam_papers: item?.exam_papers,
        other_protors: item?.other_protors?.join(","),
      })),
    };

    actCreateExamination(requestBody);
  };

  const setNextStep = () => {
    props.actSetCreateExaminationStep(currentStep + 1);
  };

  const onBackStep = () => {
    if (currentStep === 0) {
      history.push("/teacher/manage-examination");
    } else {
      props.actSetCreateExaminationStep(currentStep - 1);
    }
  };

  return (
    <CreateExamPageWrapper>
      <div className="step-wrapper">
        <Steps size="default" current={currentStep}>
          <Step title="Cài đặt cơ bản" />
          <Step title="Cài đặt nâng cao" />
          <Step title="Hoàn thành" />
        </Steps>
      </div>

      <Row
        justify="space-between"
        style={{ marginTop: "var(--margin-top)", width: "100%" }}
      >
        {currentStep !== 2 ? (
          <Button className="delete-btn" onClick={onBackStep} size="large">
            {currentStep !== 0 ? <ArrowLeftOutlined /> : null}
            {currentStep === 0 ? "Huỷ" : "Quay lại"}
          </Button>
        ) : null}

        {currentStep !== 2 ? (
          <Button
            type="primary"
            className="primary-btn"
            onClick={currentStep !== 1 ? onNextStep : onCreateExam}
            size="large"
          >
            {currentStep === 1 ? <PlusOutlined /> : null}
            {currentStep !== 1 ? "Tiếp tục" : "Tạo kỳ thi"}
            {currentStep !== 1 ? <ArrowRightOutlined /> : null}
          </Button>
        ) : null}
      </Row>

      {currentStep === 0 ? (
        <div className="config-step">
          <BasicExamConfig
            setSubmitFirstStep={setSubmitFirstStep}
            shouldSubmitFirstStep={shouldSubmitFirstStep}
            setNextStep={setNextStep}
          />
        </div>
      ) : null}

      {currentStep === 1 ? (
        <div className="config-step">
          <AdvanceExamConfig />
        </div>
      ) : null}

      {currentStep === 2 ? <SuccessfulMessage /> : null}
    </CreateExamPageWrapper>
  );
};

export default connect(
  (state) => ({
    currentStep: state?.TeacherExamination?.currentStep || 0,
    listExamRoom:
      state?.TeacherExamination?.selectedExamination?.scheduled_exam_rooms ||
      [],
    selectedExamination: state?.TeacherExamination?.selectedExamination || {},
  }),
  { actSetCreateExaminationStep }
)(CreateExamPage);
