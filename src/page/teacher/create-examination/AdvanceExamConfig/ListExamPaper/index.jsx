import { useState, useEffect, useMemo } from "react";
import { useMutation } from "react-query";
import _ from "lodash";
import { connect } from "react-redux";
import { Pagination, Row, Spin, Input, Empty } from "antd";
import { ExamPaperItem } from "@/component";
import { SearchOutlined } from "@ant-design/icons";
import { actSaveGetAllExamPaper } from "@/redux/action/teacher/examPaper";
import examPaperApi from "@/api/teacher/exam-paper";
import { ListExamPaperWrapper } from "./style";

let searchExamPaperTimeout = null;
const pageSize = 4;

const ListExamPaper = (props) => {
  const { listExamPaper, totalData, examPaper, setExamPaper } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [page, onSetPage] = useState(1);
  const [searchText, setSearchText] = useState();

  const listAllExamPaper = useMemo(() => {
    if (_.find(listExamPaper, { id: examPaper?.id })) {
      return listExamPaper;
    } else {
      if (examPaper) {
        return [examPaper, ...listExamPaper];
      } else return listExamPaper;
    }
  }, [listExamPaper, examPaper]);

  const { mutate: actGetListExamPaper } = useMutation(
    (params) => examPaperApi.getListExamPaper(params),
    {
      onSuccess: (res) => {
        props.actSaveGetAllExamPaper(res?.data);
      },
      onSettled: () => {
        setIsLoading(false);
      },
    }
  );

  useEffect(() => {
    setIsLoading(true);
    actGetListExamPaper({
      skip: page - 1,
      limit: pageSize,
      query_name: searchText,
    });
  }, []);

  const onSearchExamPaper = (event) => {
    const { value } = event.target;
    setSearchText(value);

    if (searchExamPaperTimeout) {
      clearTimeout(searchExamPaperTimeout);
      searchExamPaperTimeout = null;
    }

    searchExamPaperTimeout = setTimeout(() => {
      setIsLoading(true);
      actGetListExamPaper({
        skip: 0,
        limit: pageSize,
        query_name: value,
      });
    }, 300);
  };

  const renderListExamPaper = () =>
    listAllExamPaper.map((item, index) => (
      <ExamPaperItem
        key={index}
        active={examPaper?.id === item?.id}
        examPaper={item}
        onClick={() => setExamPaper(item)}
      />
    ));

  const onPaginationChange = (currentPage) => {
    onSetPage(currentPage);
    setIsLoading(true);

    actGetListExamPaper({
      skip: currentPage - 1,
      limit: pageSize,
      query_name: searchText,
    });
  };

  const onShowTotalData = () => {
    return `Có ${totalData} dữ liệu`;
  };

  return (
    <ListExamPaperWrapper>
      <div className="heading">
        <div className="search-input">
          <Input
            placeholder="Tìm kiếm đề thi"
            className="custom-input"
            style={{ padding: "0.5rem 1.3rem", width: "25rem" }}
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={onSearchExamPaper}
          />
        </div>
      </div>

      <Spin spinning={isLoading}>
        {renderListExamPaper()}

        {totalData === 0 ? (
          <Empty
            description="Không có đề thi nào"
            style={{ marginTop: "3rem", fontSize: "1.5rem" }}
          />
        ) : null}
      </Spin>

      <Row justify="end" style={{ marginTop: "var(--margin-top)" }}>
        <Pagination
          size="small"
          total={totalData}
          pageSize={pageSize}
          current={page}
          onChange={onPaginationChange}
          showTotal={onShowTotalData}
        />
      </Row>
    </ListExamPaperWrapper>
  );
};

export default connect(
  (state) => ({
    listExamPaper: state.TeacherExamPaper.listExamPaper,
    totalData: state.TeacherExamPaper.totalData,
  }),
  {
    actSaveGetAllExamPaper,
  }
)(ListExamPaper);
