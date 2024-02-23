import React, { useState, useCallback, useEffect } from "react";
import { Col, Row, Button } from "antd";
import { useQuery } from "@tanstack/react-query";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { meetApi } from "../../../services/apis/meet";
import { groupBy } from "lodash";

const ListMeeting = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentWeek, setCurrentWeek] = useState(moment());
  const { data: meets, refetch } = useQuery({
    queryKey: ["meets"],
    queryFn: () =>
      meetApi.getAll({
        page: page,
        limit: pageSize,
        startDate: currentWeek.clone().startOf("week").format("YYYY-MM-DD"),
        endDate: currentWeek.clone().endOf("week").format("YYYY-MM-DD"),
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

  const startOfWeek = currentWeek.clone().startOf("week").format("DD/MM/YYYY");
  const endOfWeek = currentWeek.clone().endOf("week").format("DD/MM/YYYY");

  const groupedMeetings = groupBy(meets?.data, (meeting) =>
    moment(meeting.startTime).format("DD/MM/YYYY")
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
          fontFamily: "Times New Roman",
        }}
      >
        Lịch họp
      </h2>
      <div style={{ display: "flex", fontFamily: "Times New Roman" }}>
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

      {Object.entries(groupedMeetings).map(([date, meetings]) => (
        <div
          key={date}
          style={{
            paddingLeft: "10px",
            marginTop: "5px",
            fontFamily: "Times New Roman",
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
            <div>{moment(date, "DD/MM/YYYY").format("dddd")}</div>
            <div>{date}</div>
          </div>
          {meetings.map((item, index) => (
            <div
              key={index}
              style={{
                width: "95%",
                background: "#6CA6CD",
                paddingTop: "10px",
                marginTop: "2px",
                paddingBottom: "10px",
                borderRadius: "6px",
              }}
            >
              <Row>
                <Col flex={1}>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "white",
                      paddingLeft: "12px",
                      fontFamily: "Times New Roman",
                    }}
                  >
                    {moment(item.startTime).format("HH:mm")} -{" "}
                    {moment(item.endTime).format("HH:mm")}
                  </div>
                </Col>
                <Col flex={4} style={{ minWidth: "1200px" }}>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "white",
                      paddingLeft: "12px",
                      lineHeight: "25px",
                      fontFamily: "Times New Roman",
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
      ))}
    </main>
  );
};

export default ListMeeting;
