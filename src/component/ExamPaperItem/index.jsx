import fileImg from "@/asset/file.png";
import { Icon } from "@/component";
import { EXAM_PAPER_TYPE } from "@/util/config";
import { ExamPaperItemWrapper } from "./style";

const ExamPaperItem = (props) => {
  const { active, examPaper, onClick, isSingle, style } = props;

  return (
    <ExamPaperItemWrapper
      active={active}
      onClick={onClick}
      isSingle={isSingle}
      style={style}
    >
      {!isSingle ? <div className="check" /> : null}

      <div className="icon">
        <img src={fileImg} alt="" />
      </div>

      <div className="test-detail">
        <div className="info">
          <div className="name">{examPaper?.name}</div>
          <div className="type">{EXAM_PAPER_TYPE[examPaper?.format]}</div>
        </div>

        <span className="summary">
          {!isSingle ? (
            <div className="item">
              <div className="icon">
                <Icon name="event" />
              </div>

              <div className="label">{examPaper?.created_at}</div>
            </div>
          ) : null}

          <div className="item">
            <div className="icon">
              <Icon name="help_center" />
            </div>

            <div className="label">25 câu hỏi</div>
          </div>

          <div className="item">
            <div className="icon">
              <Icon name="fact_check" />
            </div>

            <div className="label">{examPaper?.score_level}</div>
          </div>

          <div className="item">
            <div className="icon">
              <Icon name="alarm" />
            </div>

            <div className="label">{examPaper?.duration_mins} phút</div>
          </div>
        </span>
      </div>
    </ExamPaperItemWrapper>
  );
};

export default ExamPaperItem;
