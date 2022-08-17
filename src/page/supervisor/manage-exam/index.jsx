import { Select } from "antd";
import { connect } from "react-redux";
import { PageHeading } from "@/component";
import { ManageClassPageWrapper } from "./style";
import ClassTable from "./StudentTable";

const { Option } = Select;

const ManageStudentPage = (props) => {
  return (
    <ManageClassPageWrapper>
      <div className="heading">
        <PageHeading>Danh sách học sinh</PageHeading>

        <div className="extras">
          <Select
            defaultValue="10"
            style={{ width: "18rem" }}
            size="large"
            className="custom-select"
          >
            <Option value="10">Bài thi lớp 10</Option>
            <Option value="11">Bài thi lớp 11</Option>
            <Option value="12">Bài thi lớp 12</Option>
          </Select>
        </div>
      </div>

      <div className="table-wrapper">
        <ClassTable />
      </div>
    </ManageClassPageWrapper>
  );
};

export default connect((state) => ({}), {})(ManageStudentPage);
