import React, { useState, useCallback, useEffect } from "react";
import { Col, Row, Button } from "antd";
import { useQuery } from "@tanstack/react-query";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { meetApi } from "../../../services/apis/meet";
import { groupBy, sortBy } from "lodash"; // Thêm sortBy từ lodash

const ListMeeting = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentWeek, setCurrentWeek] = useState(moment().startOf("isoWeek")); // Sửa từ startOf('week') sang startOf('isoWeek')
  const { data: meets, refetch } = useQuery({
    queryKey: ["meets"],
    queryFn: () =>
      meetApi.getAll({
        page: page,
        limit: pageSize,
        startDate: currentWeek.clone().isoWeekday(1).format("YYYY-MM-DD"), // Sửa từ startOf('week') sang isoWeekday(1)
        endDate: currentWeek.clone().isoWeekday(7).format("YYYY-MM-DD"), // Sửa từ endOf('week') sang isoWeekday(7)
      }),
    enabled: true,
  });

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

  const getVietnameseDay = (englishDay) => {
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

  // Sắp xếp theo thời gian bắt đầu của lịch họp
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
        <Button type="primary" style={{ margin: "0 20px", height: "35px" }}>
          Tìm kiếm
        </Button>
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
              return moment(a.startTime).diff(b.startTime);
            }).map((item, index) => (
              <div
                key={index}
                style={{
                  width: "95%",
                  background: "#3a87ad",
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
                    style={{ maxWidth: "1100px", minWidth: "1100px" }}
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
                      <div>Người tạo: {item.adminUserId}</div>
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        );
      })}
      {/* Hiển thị thông báo nếu không có sự kiện nào trong tuần */}
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
            fontFamily: "Montserrat",
          }}
        >
          Không có sự kiện để hiển thị
        </div>
      )}
    </main>
  );
};

export default ListMeeting;
