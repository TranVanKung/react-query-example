import { PageHeading } from "@/component";
import { RecentExamTableWrapper } from "./style";
import ExamItem from "./ExamItem";

const listExam = [
  {
    name: "Kiểm tra toán 1 tiết",
    date: "23/10/2021",
    noOfStudent: "35/35",
    status: "error",
  },
  {
    name: "Kiểm tra toán 1 tiết",
    date: "23/10/2021",
    noOfStudent: "35/35",
    status: "success",
  },
  {
    name: "Kiểm tra toán 1 tiết",
    date: "23/10/2021",
    noOfStudent: "35/35",
    status: "success",
  },
  {
    name: "Kiểm tra toán 1 tiết",
    date: "23/10/2021",
    noOfStudent: "35/35",
    status: "success",
  },
  {
    name: "Kiểm tra toán 1 tiết",
    date: "23/10/2021",
    noOfStudent: "35/35",
    status: "success",
  },
  {
    name: "Kiểm tra toán 1 tiết",
    date: "23/10/2021",
    noOfStudent: "35/35",
    status: "success",
  },
];

const RecentExamTable = () => {
  const renderExamItem = () =>
    listExam.map((item, index) => (
      <ExamItem
        status={item?.status}
        name={item?.name}
        date={item?.date}
        noOfStudent={item?.noOfStudent}
        key={index}
      />
    ));

  return (
    <RecentExamTableWrapper>
      <div style={{ padding: "var(--padding-page)" }}>
        <PageHeading>Kỳ thi gần đây</PageHeading>
      </div>

      <div className="list-exam">{renderExamItem()}</div>
    </RecentExamTableWrapper>
  );
};

export default RecentExamTable;
