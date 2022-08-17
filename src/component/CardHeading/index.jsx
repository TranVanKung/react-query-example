import { CardHeadingWrapper } from "./style";

const CardHeading = ({ children, style }) => {
  return (
    <CardHeadingWrapper style={{ ...style }}>{children}</CardHeadingWrapper>
  );
};

export default CardHeading;
