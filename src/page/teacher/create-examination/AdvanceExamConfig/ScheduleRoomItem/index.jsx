import { useEffect, useState, useMemo } from "react";
import {
  Form,
  Select,
  DatePicker,
  Empty,
  Row,
  Col,
  Tooltip,
  Popconfirm,
  message,
  Button,
} from "antd";
import _ from "lodash";
import moment from "moment";
import { useMutation } from "react-query";
import { connect } from "react-redux";
import { ExamPaperItem, Icon, CardHeading } from "@/component";
import examRoomApi from "@/api/teacher/exam-room";
import protorApi from "@/api/teacher/protor";
import { actSetModalExamPaperOpen } from "@/redux/action/teacher/examination";
import examImg from "@/asset/exam.png";
import { ScheduleRoomItemWrapper, EmptyExamItemWrapper } from "./style";

const { Option } = Select;
let searchExamRoomTimeout = null;
let searchProtorTimeout = null;
const examRoomLimit = 10;
const protorLimit = 10;

const ScheduleRoomItem = (props) => {
  const {
    index,
    onDeleteRoom,
    onUpdateRoom,
    setSelectedRoomIndex,
    setSelectedExamPaper,
    listScheduleRoom,
    setSelectedExamPaperIndex,
    currentStep,
  } = props;

  const [form] = Form.useForm();
  const [listExamRoom, setListExamRoom] = useState([]);
  const [listProtor, setListProtor] = useState([]);

  console.log("listExamRoom", listExamRoom);

  const scheduleRoomConfig = useMemo(() => {
    return listScheduleRoom[index];
  }, [index, listScheduleRoom]);

  const isUpdateMode = useMemo(() => {
    return scheduleRoomConfig?.id || false;
  }, [scheduleRoomConfig]);

  const listExamPaper = scheduleRoomConfig?.list_exam_papers || [];

  const { mutate: actGetListExamRoom } = useMutation(
    (params) => examRoomApi.getListExamRoom(params),
    {
      onSuccess: (res) => {
        const tempListData = res?.data?.list_data;

        if (scheduleRoomConfig?.exam_room) {
          if (
            !_.find(tempListData, { id: scheduleRoomConfig?.exam_room?.id })
          ) {
            tempListData.push(scheduleRoomConfig?.exam_room);
          }
        }
        setListExamRoom(tempListData);
      },
    }
  );

  const { mutate: actGetListProtor } = useMutation(
    (params) => protorApi.getListProtor(params),
    {
      onSuccess: (res) => {
        const tempListData = res?.data?.list_data;

        if (scheduleRoomConfig?.protors?.length > 0) {
          scheduleRoomConfig?.protors?.forEach((protor) => {
            if (!_.find(tempListData, { id: protor?.id })) {
              tempListData.push(protor);
            }
          });
        }

        setListProtor(tempListData);
      },
    }
  );

  useEffect(() => {
    console.log("run");
    actGetListExamRoom({
      skip: 0,
      limit: examRoomLimit,
      query_name: "",
    });

    actGetListProtor({
      skip: 0,
      limit: protorLimit,
      name: "",
    });
  }, [currentStep]);

  const onSearchExamRoom = (value) => {
    if (searchExamRoomTimeout) {
      clearTimeout(searchExamRoomTimeout);
      searchExamRoomTimeout = null;
    }

    searchExamRoomTimeout = setTimeout(() => {
      actGetListExamRoom({
        skip: 0,
        limit: examRoomLimit,
        query_name: value,
      });
    }, 300);
  };

  const onSearchProtor = (value) => {
    if (searchProtorTimeout) {
      clearTimeout(searchProtorTimeout);
      searchProtorTimeout = null;
    }

    searchProtorTimeout = setTimeout(() => {
      actGetListProtor({
        skip: 0,
        limit: protorLimit,
        name: value,
      });
    }, 300);
  };

  const onOpenModalExamPaper = (examPaper, examPaperIndex) => {
    setSelectedRoomIndex(index);
    setSelectedExamPaper(examPaper || null);
    props.actSetModalExamPaperOpen(true);
    setSelectedExamPaperIndex(examPaperIndex);
  };

  const onConfirmDeleteRoom = () => {
    onDeleteRoom(index);
  };

  const onSaveRoomInfo = async () => {
    message.success("Đã cập nhật dữ liệu phòng thi");
  };

  const onChangeStartTime = (date) => {
    onUpdateRoom(index, {
      ...scheduleRoomConfig,
      start_time: date.format(),
    });
  };

  const onChangeListProtor = (listProtorId) => {
    const listProtorInfo = listProtorId.map((protorId) =>
      _.find(listProtor, { id: protorId })
    );

    onUpdateRoom(index, {
      ...scheduleRoomConfig,
      protors: listProtorInfo,
    });
  };

  const onChangeRoom = (roomId) => {
    onUpdateRoom(index, {
      ...scheduleRoomConfig,
      exam_room: _.find(listExamRoom, { id: roomId }),
    });
  };

  return (
    <ScheduleRoomItemWrapper>
      <div className="heading">
        <CardHeading>Lớp thi {index + 1}</CardHeading>

        <Tooltip title="Xoá" placement="top">
          <Popconfirm
            title="Bạn chắc chắc muốn xoá lớp thi này?"
            onConfirm={onConfirmDeleteRoom}
          >
            <div className="delete-room">
              <Icon name="delete" />
            </div>
          </Popconfirm>
        </Tooltip>
      </div>

      {listExamPaper?.length > 0 ? (
        <div style={{ width: "100%" }}>
          {listExamPaper.map((examPaper, index) => (
            <ExamPaperItem
              examPaper={{
                name: examPaper?.name,
                format: examPaper?.format,
                score_level: examPaper?.score_level,
                duration_mins: examPaper?.duration_mins,
                created_at: examPaper?.created_at,
              }}
              isSingle={true}
              onClick={() => onOpenModalExamPaper(examPaper, index)}
              key={index}
              style={{ marginBottom: "var(--margin-bottom)" }}
            />
          ))}
        </div>
      ) : null}

      <EmptyExamItemWrapper onClick={() => onOpenModalExamPaper(null, null)}>
        <img src={examImg} alt="" />
        <div className="text">Thêm đề thi</div>
      </EmptyExamItemWrapper>

      <Form layout="vertical" form={form} style={{ width: "100%" }}>
        <Row
          justify="space-between"
          gutter={16}
          style={{ marginTop: "var(--margin-top)" }}
        >
          <Col span={12}>
            <Form.Item label="Phòng thi" className="custom-form-item">
              <Select
                className="custom-select"
                size="large"
                placeholder="Chọn một phòng thi"
                showSearch={true}
                onSearch={onSearchExamRoom}
                notFoundContent={<Empty />}
                filterOption={false}
                value={scheduleRoomConfig?.exam_room?.id}
                onChange={onChangeRoom}
              >
                {listExamRoom?.map((examRoom, index) => (
                  <Option value={examRoom?.id} key={index}>
                    {examRoom?.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Chọn giám thị" className="custom-form-item">
              <Select
                className="custom-select"
                size="large"
                placeholder="Chọn giám thị"
                mode="multiple"
                showSearch={true}
                onSearch={onSearchProtor}
                notFoundContent={<Empty />}
                filterOption={false}
                onChange={onChangeListProtor}
                value={
                  scheduleRoomConfig?.protors?.length > 0
                    ? scheduleRoomConfig?.protors?.map((item) => item?.id)
                    : []
                }
              >
                {listProtor?.map((protor, index) => (
                  <Option value={protor?.id} key={index}>
                    {protor?.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Giờ thi" className="custom-form-item">
          <DatePicker
            size="large"
            className="custom-datepicker"
            placeholder="Chọn thời điểm bắt đầu thi"
            format="DD-MM-YYYY HH:mm"
            showTime
            value={
              scheduleRoomConfig?.start_time
                ? moment(scheduleRoomConfig?.start_time)
                : null
            }
            onChange={onChangeStartTime}
          />
        </Form.Item>

        {isUpdateMode ? (
          <Row justify="end">
            <Button
              type="primary"
              className="primary-btn"
              size="large"
              onClick={onSaveRoomInfo}
            >
              Lưu
            </Button>
          </Row>
        ) : null}
      </Form>
    </ScheduleRoomItemWrapper>
  );
};

export default connect(
  (state) => ({
    listScheduleRoom:
      state?.TeacherExamination?.selectedExamination?.scheduled_exam_rooms ||
      [],
    currentStep: state?.TeacherExamination?.currentStep || 0,
  }),
  {
    actSetModalExamPaperOpen,
  }
)(ScheduleRoomItem);
