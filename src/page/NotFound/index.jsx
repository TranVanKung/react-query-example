import React from "react";
import { Result, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { NotFoundPageWrapper } from "./style";

const NotFoundpage = (props) => {
  const history = useHistory();

  return (
    <NotFoundPageWrapper>
      <Result
        status="404"
        title="404"
        subTitle="Không tìm thấy trang"
        extra={
          <Button
            type="primary"
            onClick={history.goBack}
            className="primary-btn"
          >
            <ArrowLeftOutlined />
            <span>Quay lại</span>
          </Button>
        }
      />
    </NotFoundPageWrapper>
  );
};

export default NotFoundpage;
