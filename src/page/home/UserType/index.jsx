import { useMemo } from "react";
import { connect } from "react-redux";
import { Icon } from "@/component";
import { AuthTypeWrapper } from "./style";

const AuthType = (props) => {
  const { icon, label, value, userType, onClick } = props;

  const isActive = useMemo(() => {
    return userType === value;
  }, [userType, value]);

  return (
    <AuthTypeWrapper isActive={isActive} onClick={onClick}>
      <Icon name={icon} />
      <div className="label">{label}</div>
    </AuthTypeWrapper>
  );
};

export default connect((state) => ({
  userType: state?.App.userType,
}))(AuthType);
