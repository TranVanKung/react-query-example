import { DatePicker } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import { PageHeading } from "@/component";
import { ManageSchedulePageWrapper } from "./style";
import ScheduleTable from "./ScheduleTable";

const ManageSchedulePage = (props) => {
  return (
    <ManageSchedulePageWrapper>
      <div className="heading">
        <PageHeading>Danh sách bài thi</PageHeading>

        <div className="extras">
          <DatePicker
            size="large"
            className="custom-datepicker"
            style={{ width: "20rem" }}
            value={moment()}
          />
        </div>
      </div>

      <div className="table-wrapper">
        <ScheduleTable />
      </div>
    </ManageSchedulePageWrapper>
  );
};

export default connect((state) => ({}), {})(ManageSchedulePage);
