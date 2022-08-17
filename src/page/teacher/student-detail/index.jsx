import { StudentDetailWrapper } from "./style";
import ResultExamTable from "./ResultExamTable";
import StudentInfo from "./StudentInfo";

const StudentDetail = () => {
  return (
    <StudentDetailWrapper>
      <div className="table-wrapper">
        <ResultExamTable />
      </div>

      <div className="info-wrapper">
        <StudentInfo />
      </div>
    </StudentDetailWrapper>
  );
};

export default StudentDetail;
