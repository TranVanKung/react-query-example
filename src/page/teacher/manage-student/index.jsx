import { useState, useMemo, useEffect } from "react";
import { Button, Popconfirm, Select, Empty } from "antd";
import _ from "lodash";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { useMutation } from "react-query";
import { useHistory, useLocation } from "react-router-dom";
import qs from "qs";
import { PageHeading, GoBack } from "@/component";
import { actSetModalStudentVisible } from "@/redux/action/teacher/student";
import {
  actSaveSelectedExamRoom,
  actSaveGetAllExamRoom,
} from "@/redux/action/teacher/examRoom";
import studentApi from "@/api/teacher/student";
import { SEARCH_SIZE } from "@/util/config";
import examRoomApi from "@/api/teacher/exam-room";
import { ManageStudentPageWrapper } from "./style";
import StudentTable from "./StudentTable";
import ModalStudent from "./ModalStudent";

const { Option } = Select;
let searchExamRoomTimeout = null;

const ManageStudentPage = (props) => {
  const { selectedExamRoom, listExamRoom } = props;

  const [selectedRowKeys, onSetSelectedRowKeys] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [isTableLoading, onSetTableLoading] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const searchQuery = qs.parse(location?.search.replace("?", ""));
    setRoomId(searchQuery?.roomId);
  }, [location]);

  useEffect(() => {
    if (roomId) {
      actGetExamRoomDetail();
    } else {
      actGetListExamRoom({
        skip: 0,
        limit: SEARCH_SIZE,
      });
    }
  }, [roomId]);

  useEffect(() => {
    if (listExamRoom.length > 0 && !roomId) {
      setRoomId(listExamRoom[0].id);
    }
  }, [roomId, listExamRoom]);

  const { mutate: actDeleteStudent } = useMutation(
    (body) => studentApi.deleteStudent(body),
    {
      onSuccess: (res) => {
        if (res?.data) {
          props.actSaveDeleteStudent(selectedRowKeys[0]);
        }
      },
      onSettled: () => {
        if (!shouldRefresh) {
          setShouldRefresh(true);
          onSetSelectedRowKeys([]);
        }
      },
    }
  );

  const { mutate: actGetExamRoomDetail } = useMutation(
    () => examRoomApi.getExamRoomDetail(roomId),
    {
      onSuccess: (res) => {
        if (res?.data) {
          props.actSaveSelectedExamRoom(res?.data);
        }
      },
    }
  );

  const { mutate: actGetListExamRoom } = useMutation(
    (params) => examRoomApi.getListExamRoom(params),
    {
      onSuccess: (res) => {
        props.actSaveGetAllExamRoom(res?.data);
      },
      onSettled: () => {
        onSetTableLoading(false);

        if (shouldRefresh) {
          setShouldRefresh(false);
        }
      },
    }
  );

  const onSearchExamRoom = (searchText) => {
    if (Boolean(searchText)) {
      if (searchExamRoomTimeout) {
        clearTimeout(searchExamRoomTimeout);
        searchExamRoomTimeout = null;
      }

      searchExamRoomTimeout = setTimeout(() => {
        actGetListExamRoom({
          skip: 0,
          limit: SEARCH_SIZE,
          query_name: searchText,
        });
      }, 300);
    }
  };

  const onChangeExamRoom = (value) => {
    history.replace(`/teacher/manage-student?roomId=${value}`);
  };

  const onCreateExam = () => {
    props.actSetModalStudentVisible(true);
  };

  const onDeleteStudent = () => {
    actDeleteStudent({ id: selectedRowKeys[0], exam_room_id: roomId });
  };

  const onGoback = () => {
    history.push("/teacher/manage-exam-room");
  };

  const isHasSelectedRow = useMemo(
    () => selectedRowKeys.length !== 0,
    [selectedRowKeys]
  );

  const allExamRoom = useMemo(() => {
    let tempListExamRoom = [...listExamRoom];

    if (!_.find(listExamRoom, { id: selectedExamRoom?.id })) {
      tempListExamRoom = [selectedExamRoom, ...tempListExamRoom];
    }

    return tempListExamRoom;
  }, [listExamRoom, selectedExamRoom]);

  return (
    <ManageStudentPageWrapper>
      <div className="heading">
        <GoBack onClick={onGoback} />
        <PageHeading>Danh sách thí sinh</PageHeading>

        <div className="extras">
          <Select
            size="large"
            className="custom-select"
            style={{ minWidth: "20rem", marginRight: "var(--margin-right)" }}
            value={roomId}
            showSearch={true}
            onSearch={onSearchExamRoom}
            notFoundContent={<Empty />}
            filterOption={false}
            onChange={onChangeExamRoom}
          >
            {allExamRoom.map((examRoom, index) => (
              <Option value={examRoom?.id} key={index}>
                {examRoom?.name}
              </Option>
            ))}
          </Select>

          <Popconfirm
            title={`Bạn có chắc xoá ${selectedRowKeys.length} dữ liệu`}
            onConfirm={onDeleteStudent}
            okText="Có"
            cancelText="Không"
            disabled={!isHasSelectedRow}
          >
            <Button
              className={isHasSelectedRow ? "delete-btn" : "delete-btn disable"}
              size="large"
              style={{
                marginRight: "var(--margin-right)",
              }}
              icon={<DeleteOutlined />}
            >
              Xoá
            </Button>
          </Popconfirm>

          <Button
            className="primary-btn"
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={onCreateExam}
          >
            Thêm mới
          </Button>
        </div>
      </div>

      <div className="table-wrapper">
        <StudentTable
          isTableLoading={isTableLoading}
          onSetTableLoading={onSetTableLoading}
          selectedRowKeys={selectedRowKeys}
          onSetSelectedRowKeys={onSetSelectedRowKeys}
          setShouldRefresh={setShouldRefresh}
          shouldRefresh={shouldRefresh}
          roomId={roomId}
        />
      </div>

      <ModalStudent />
    </ManageStudentPageWrapper>
  );
};

export default connect(
  (state) => ({
    selectedExamRoom: state.TeacherExamRoom.selectedExamRoom,
    listExamRoom: state.TeacherExamRoom.listExamRoom,
  }),
  { actSetModalStudentVisible, actSaveSelectedExamRoom, actSaveGetAllExamRoom }
)(ManageStudentPage);
