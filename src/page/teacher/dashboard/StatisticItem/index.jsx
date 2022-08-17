import { StatisticItemWrapper } from "./style";

const StatisticItem = (props) => {
  const { number, text, icon } = props;

  return (
    <StatisticItemWrapper>
      <img src={icon} alt="" />

      <div className="info">
        <div className="number">{number}</div>
        <div className="text">{text}</div>
      </div>
    </StatisticItemWrapper>
  );
};

export default StatisticItem;
