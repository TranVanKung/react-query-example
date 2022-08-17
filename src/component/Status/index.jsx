import { StatusWrapper } from "./style";

const Status = (props) => {
  const { content, isSuccess, style } = props;

  return (
    <StatusWrapper isSuccess={isSuccess} style={style}>
      {content}
    </StatusWrapper>
  );
};

export default Status;
