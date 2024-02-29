import React, { useState, useCallback, useEffect } from "react";
import { Col, Row, Button, Modal, Select } from "antd";
import { LeftOutlined, RightOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { meetApi } from "../../../services/apis/meet";
import { useQuery, useMutation } from "@tanstack/react-query";
import { groupBy, sortBy } from "lodash";

const { Option } = Select;

const ListMeeting = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentWeek, setCurrentWeek] = useState(moment().startOf("isoWeek"));
  const { data: meets, refetch } = useQuery({
    queryKey: ["meets"],
    queryFn: () =>
      meetApi.getAll({
        page: page,
        limit: pageSize,
        // startDate: currentWeek.clone().isoWeekday(1).format("YYYY-MM-DD"),
        // endDate: currentWeek.clone().isoWeekday(7).format("YYYY-MM-DD"),
      }),
    enabled: true,
  });

  const { mutate: deleteMeeting } = useMutation(meetApi.deleteById);

  const goToPreviousWeek = () => {
    setCurrentWeek((prevWeek) => prevWeek.clone().subtract(1, "week"));
  };

  const goToNextWeek = () => {
    setCurrentWeek((prevWeek) => prevWeek.clone().add(1, "week"));
  };

  useEffect(() => {
    refetch();
  }, [page, pageSize, refetch, currentWeek]);

  const startOfWeek = currentWeek.clone().isoWeekday(1).format("DD/MM/YYYY");
  const endOfWeek = currentWeek.clone().isoWeekday(7).format("DD/MM/YYYY");

  const handleDeleteMeeting = async (id: string) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa lịch họp này?",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await deleteMeeting(id);
          Modal.success({ content: "Xóa thành công" });
          refetch();
        } catch (error) {
          Modal.error({ content: "Đã xảy ra lỗi" });
        }
      },
    });
  };

  const handleUpdateMeeting = (id: string) => {
    navigate(`/meeting-schedule/${id}`);
  };

  const getVietnameseDay = (englishDay: string) => {
    switch (englishDay) {
      case "Monday":
        return "Thứ 2";
      case "Tuesday":
        return "Thứ 3";
      case "Wednesday":
        return "Thứ 4";
      case "Thursday":
        return "Thứ 5";
      case "Friday":
        return "Thứ 6";
      case "Saturday":
        return "Thứ 7";
      case "Sunday":
        return "Chủ Nhật";
      default:
        return "";
    }
  };

  const groupedMeetings = groupBy(meets?.data, (meeting) => {
    const formattedDate = moment(meeting.startTime).format("dddd, DD/MM/YYYY");
    return formattedDate;
  });

  const sortedGroupedMeetings = sortBy(
    Object.entries(groupedMeetings),
    ([date]) => {
      const dayOfWeek = moment(date, "dddd, DD/MM/YYYY").isoWeekday();
      return dayOfWeek;
    }
  );

  const handleChangPage = useCallback((page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  }, []);

  return (
    <main>
      <div style={{ padding: "20px 0", float: "right" }}>
        <Button
          type="primary"
          style={{ height: "35px" }}
          onClick={() => {
            navigate("/meeting-schedule/add");
          }}
        >
          Tạo lịch họp
        </Button>
      </div>
      <h2
        style={{
          paddingTop: "70px",
          paddingLeft: "13px",
          fontFamily: "Montserrat",
        }}
      >
        Lịch họp
      </h2>
      <div style={{ display: "flex", fontFamily: "Montserrat" }}>
        <div
          style={{
            paddingLeft: "10px",
            fontSize: "20px",
            fontWeight: "700",
            paddingRight: "20px",
          }}
        >
          {startOfWeek} - {endOfWeek}
        </div>
        <Button
          style={{
            borderRadius: "0",
            borderTopLeftRadius: "30%",
            borderBottomLeftRadius: "30%",
            width: "45px",
          }}
          icon={<LeftOutlined />}
          size="middle"
          onClick={goToPreviousWeek}
        />
        <Button
          style={{
            borderRadius: "0",
            borderTopRightRadius: "30%",
            borderBottomRightRadius: "30%",
            width: "45px",
          }}
          icon={<RightOutlined />}
          size="middle"
          onClick={goToNextWeek}
        />
      </div>

      {sortedGroupedMeetings.map(([date, meetings]) => {
        const isWithinCurrentWeek = currentWeek.clone().startOf("isoWeek").isSame(
          moment(date, "dddd, DD/MM/YYYY").startOf("isoWeek"),
          "week"
        );

        if (!isWithinCurrentWeek) return null;

        return (
          <div
            key={date}
            style={{
              paddingLeft: "10px",
              marginTop: "5px",
              fontFamily: "Montserrat",
            }}
          >
            <div
              style={{
                width: "95%",
                display: "flex",
                justifyContent: "space-between",
                border: "1px solid #ccc",
                padding: "10px",
                fontSize: "18px",
                fontWeight: "700",
                borderRadius: "6px",
              }}
            >
              <div>
                {getVietnameseDay(moment(date, "DD/MM/YYYY").format("dddd"))}
              </div>
              <div>{moment(date, "dddd, DD/MM/YYYY").format("DD/MM/YYYY")}</div>
            </div>
            {meetings.sort((a, b) => {
              const startTimeDiff = moment(a.startTime).diff(b.startTime);
              if (startTimeDiff !== 0) {
                return startTimeDiff;
              } else {
                return moment(a.endTime).diff(b.endTime);
              }
            }).map((item, index) => (
              <div
                key={item.id}
                style={{
                  position: 'relative',
                  width: "95%",
                  background: "#6CA6CD",
                  paddingTop: "10px",
                  marginTop: "2px",
                  paddingBottom: "10px",
                  borderRadius: "6px",
                }}
              >
                <Row>
                  <Col
                    flex={1}
                    style={{ maxWidth: "250px", minWidth: "250px" }}
                  >
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "white",
                        paddingLeft: "12px",
                        fontFamily: "Montserrat",
                      }}
                    >
                      {moment(item.startTime).format("HH:mm")} -{" "}
                      {moment(item.endTime).format("HH:mm")}
                    </div>
                  </Col>
                  <Col
                    flex={4}
                    style={{ maxWidth: "1150px", minWidth: "1150px" }}
                  >
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "400",
                        color: "white",
                        paddingLeft: "12px",
                        lineHeight: "25px",
                        fontFamily: "Montserrat",
                      }}
                    >
                      <div>{item.title}</div>
                      <div style={{ fontWeight: "700" }}>
                        Thời gian: {moment(item.startTime).format("HH:mm")} -{" "}
                        {moment(item.endTime).format("HH:mm")}
                      </div>
                      <div>Phòng họp: {item.room}</div>
                      <div>Chủ trì: {item.host}</div>
                      <div>Người tham dự: {item.participants}</div>
                      <div>Người tạo: {item.adminUser.fullName}</div>
                    </div>
                    <Button
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '40px',
                        marginRight: "10px"
                      }}
                      icon={<EditOutlined />}
                      onClick={() => handleUpdateMeeting(item.id)}
                    />
                    <Button
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px'
                      }}
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteMeeting(item.id)}
                    />
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        );
      })}
      {sortedGroupedMeetings.every(([date, meetings]) => {
        const isWithinCurrentWeek = currentWeek.clone().startOf("isoWeek").isSame(
          moment(date, "dddd, DD/MM/YYYY").startOf("isoWeek"),
          "week"
        );
        return !isWithinCurrentWeek || meetings.length === 0;
      }) && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
            fontFamily: "Montserrat",
            fontSize: "20px",
            color: "#555",
          }}
        >
          Không có sự kiện để hiển thị
        </div>
      )}
    </main>
  );
};

export default ListMeeting;
