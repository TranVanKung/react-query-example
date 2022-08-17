import icon1Img from "@/asset/icon1.png";
import icon2Img from "@/asset/icon2.png";
import icon3Img from "@/asset/icon3.png";
import icon4Img from "@/asset/icon4.png";
import { DashboardPageWrapper } from "./style";
import NextExamTable from "./NextExamTable";
import RecentExamTable from "./RecentExamTable";
import StatisticItem from "./StatisticItem";

const statistic = [
  {
    icon: icon1Img,
    number: "03",
    text: "Kỳ thi đã tổ chức",
  },
  {
    icon: icon2Img,
    number: "67",
    text: "Câu hỏi",
  },
  {
    icon: icon3Img,
    number: "12",
    text: "Lớp thi",
  },
  {
    icon: icon4Img,
    number: "1.4k",
    text: "Học sinh",
  },
];

const DashboardPage = () => {
  const renderStatistic = () =>
    statistic.map((item, index) => (
      <StatisticItem
        number={item?.number}
        icon={item?.icon}
        text={item?.text}
        key={index}
      />
    ));

  return (
    <DashboardPageWrapper>
      <div className="list-statistic">{renderStatistic()}</div>

      <div className="main">
        <div className="next-exam-wrapper">
          <NextExamTable />
        </div>

        <div className="recent-exam-wrapper">
          <RecentExamTable />
        </div>
      </div>
    </DashboardPageWrapper>
  );
};

export default DashboardPage;
