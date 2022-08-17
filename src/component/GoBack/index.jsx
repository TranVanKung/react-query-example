import { Icon } from "@/component";
import { GoBackWrapper } from "./style";

const GoBack = (props) => {
  const { onClick, text = "Quay lại" } = props;

  return (
    <GoBackWrapper onClick={onClick}>
      <Icon
        name="arrow_back"
        style={{ fontSize: "1.6rem", color: "var(--color-text-secondary)" }}
      />
      <span className="text">{text}</span>
    </GoBackWrapper>
  );
};

export default GoBack;
