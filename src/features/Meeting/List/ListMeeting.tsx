
import { Col, Row } from "antd";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import { find } from "lodash";
import moment from "moment";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { problemIndustries } from "../../../assets/data";
import DynamicTable from "../../../components/DynamicTable";
import PaginationCustom from "../../../components/Pagination/Pagination";
import StatusTag from "../../../components/StatusTag/StatusTag";
import { prinfApi } from "../../../services/apis/prinf";
import * as XLSX from "xlsx";

const ListMeeting = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10); //muốn 1 trang có bao nhiêu phần tử thì bỏ vào đây
  const { data: prinfs, refetch } = useQuery({
    queryKey: ["prinfs"],
    queryFn: () =>
      prinfApi.getAll({
        page: page,
        limit: pageSize,
      }),
    enabled: true,
  });

  const handleChangPage = useCallback((page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  }, []);

  useEffect(() => {
    refetch();
  }, [page, pageSize, refetch]);

  const exportToExcel = (dataToExport) => {
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "prinf.xlsx");
  };

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
          paddingLeft: "15px",
        }}
      >
        Lịch họp
      </h2>
      <div style={{display: "flex"}}>
        <div
          style={{ paddingLeft: "10px", fontSize: "20px", fontWeight: "700", paddingRight: "20px" }}
        >
          19/12/2024 - 25/12/2024
        </div>
        <Button style={{borderRadius: "0", borderTopLeftRadius: "30%", borderBottomLeftRadius: "30%", width: "45px"}} icon={<LeftOutlined />} size="middle"/>
        <Button style={{borderRadius: "0", borderTopRightRadius: "30%", borderBottomRightRadius: "30%", width: "45px"}} icon={<RightOutlined />} size="middle" />
      </div>

      <div style={{ paddingLeft: "10px", marginTop: "5px" }}>
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
          <div>Thứ 3</div>
          <div>20/02/2024</div>
        </div>
        <div
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
                }}
              >
                7:00 - 8:30
              </div>
            </Col>
            <Col flex={4}>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "400",
                  color: "white",
                  paddingLeft: "12px",
                  lineHeight: "32px",
                }}
              >
                <div>
                  Chào cờ đầu tuần, giao ban bệnh viện, điều hành chào cờ DS
                  Nguyễn Lâm Hoàng Vũ khoa Dược
                </div>
                <div style={{ fontWeight: "700" }}>Thời gian: 7:00 - 8:30</div>
                <div>Phòng họp: Hội Trường B</div>
                <div>Chủ trì: BGĐ</div>
                <div>
                  Người tham dự: Đảng ủy & Ban giám đốc, Trưởng, phó các khoa,
                  phòng, ĐDT/KTVT các khoa, đại diện 22 chi bộ
                </div>
                <div>Người tạo: Nguyễn Việt Hùng</div>
              </div>
            </Col>
          </Row>
        </div>
        <div
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
                }}
              >
                7:00 - 8:30
              </div>
            </Col>
            <Col flex={4}>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "400",
                  color: "white",
                  paddingLeft: "12px",
                  lineHeight: "32px",
                }}
              >
                <div>
                  Chào cờ đầu tuần, giao ban bệnh viện, điều hành chào cờ DS
                  Nguyễn Lâm Hoàng Vũ khoa Dược
                </div>
                <div style={{ fontWeight: "700" }}>Thời gian: 7:00 - 8:30</div>
                <div>Phòng họp: Hội Trường B</div>
                <div>Chủ trì: BGĐ</div>
                <div>
                  Người tham dự: Đảng ủy & Ban giám đốc, Trưởng, phó các khoa,
                  phòng, ĐDT/KTVT các khoa, đại diện 22 chi bộ
                </div>
                <div>Người tạo: Nguyễn Việt Hùng</div>
              </div>
            </Col>
          </Row>
        </div>
        <div
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
                }}
              >
                7:00 - 8:30
              </div>
            </Col>
            <Col flex={4}>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "400",
                  color: "white",
                  paddingLeft: "12px",
                  lineHeight: "32px",
                }}
              >
                <div>
                  Chào cờ đầu tuần, giao ban bệnh viện, điều hành chào cờ DS
                  Nguyễn Lâm Hoàng Vũ khoa Dược
                </div>
                <div style={{ fontWeight: "700" }}>Thời gian: 7:00 - 8:30</div>
                <div>Phòng họp: Hội Trường B</div>
                <div>Chủ trì: BGĐ</div>
                <div>
                  Người tham dự: Đảng ủy & Ban giám đốc, Trưởng, phó các khoa,
                  phòng, ĐDT/KTVT các khoa, đại diện 22 chi bộ
                </div>
                <div>Người tạo: Nguyễn Việt Hùng</div>
              </div>
            </Col>
          </Row>
        </div>
        <div
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
                }}
              >
                7:00 - 8:30
              </div>
            </Col>
            <Col flex={4}>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "400",
                  color: "white",
                  paddingLeft: "12px",
                  lineHeight: "32px",
                }}
              >
                <div>
                  Chào cờ đầu tuần, giao ban bệnh viện, điều hành chào cờ DS
                  Nguyễn Lâm Hoàng Vũ khoa Dược
                </div>
                <div style={{ fontWeight: "700" }}>Thời gian: 7:00 - 8:30</div>
                <div>Phòng họp: Hội Trường B</div>
                <div>Chủ trì: BGĐ</div>
                <div>
                  Người tham dự: Đảng ủy & Ban giám đốc, Trưởng, phó các khoa,
                  phòng, ĐDT/KTVT các khoa, đại diện 22 chi bộ
                </div>
                <div>Người tạo: Nguyễn Việt Hùng</div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div style={{ paddingLeft: "10px", marginTop: "5px" }}>
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
          <div>Thứ 3</div>
          <div>20/02/2024</div>
        </div>
        <div
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
                }}
              >
                7:00 - 8:30
              </div>
            </Col>
            <Col flex={4}>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "400",
                  color: "white",
                  paddingLeft: "12px",
                  lineHeight: "32px",
                }}
              >
                <div>
                  Chào cờ đầu tuần, giao ban bệnh viện, điều hành chào cờ DS
                  Nguyễn Lâm Hoàng Vũ khoa Dược
                </div>
                <div style={{ fontWeight: "700" }}>Thời gian: 7:00 - 8:30</div>
                <div>Phòng họp: Hội Trường B</div>
                <div>Chủ trì: BGĐ</div>
                <div>
                  Người tham dự: Đảng ủy & Ban giám đốc, Trưởng, phó các khoa,
                  phòng, ĐDT/KTVT các khoa, đại diện 22 chi bộ
                </div>
                <div>Người tạo: Nguyễn Việt Hùng</div>
              </div>
            </Col>
          </Row>
        </div>
        <div
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
                }}
              >
                7:00 - 8:30
              </div>
            </Col>
            <Col flex={4}>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "400",
                  color: "white",
                  paddingLeft: "12px",
                  lineHeight: "32px",
                }}
              >
                <div>
                  Chào cờ đầu tuần, giao ban bệnh viện, điều hành chào cờ DS
                  Nguyễn Lâm Hoàng Vũ khoa Dược
                </div>
                <div style={{ fontWeight: "700" }}>Thời gian: 7:00 - 8:30</div>
                <div>Phòng họp: Hội Trường B</div>
                <div>Chủ trì: BGĐ</div>
                <div>
                  Người tham dự: Đảng ủy & Ban giám đốc, Trưởng, phó các khoa,
                  phòng, ĐDT/KTVT các khoa, đại diện 22 chi bộ
                </div>
                <div>Người tạo: Nguyễn Việt Hùng</div>
              </div>
            </Col>
          </Row>
        </div>
        <div
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
                }}
              >
                7:00 - 8:30
              </div>
            </Col>
            <Col flex={4}>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "400",
                  color: "white",
                  paddingLeft: "12px",
                  lineHeight: "32px",
                }}
              >
                <div>
                  Chào cờ đầu tuần, giao ban bệnh viện, điều hành chào cờ DS
                  Nguyễn Lâm Hoàng Vũ khoa Dược
                </div>
                <div style={{ fontWeight: "700" }}>Thời gian: 7:00 - 8:30</div>
                <div>Phòng họp: Hội Trường B</div>
                <div>Chủ trì: BGĐ</div>
                <div>
                  Người tham dự: Đảng ủy & Ban giám đốc, Trưởng, phó các khoa,
                  phòng, ĐDT/KTVT các khoa, đại diện 22 chi bộ
                </div>
                <div>Người tạo: Nguyễn Việt Hùng</div>
              </div>
            </Col>
          </Row>
        </div>
        <div
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
                }}
              >
                7:00 - 8:30
              </div>
            </Col>
            <Col flex={4}>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "400",
                  color: "white",
                  paddingLeft: "12px",
                  lineHeight: "32px",
                }}
              >
                <div>
                  Chào cờ đầu tuần, giao ban bệnh viện, điều hành chào cờ DS
                  Nguyễn Lâm Hoàng Vũ khoa Dược
                </div>
                <div style={{ fontWeight: "700" }}>Thời gian: 7:00 - 8:30</div>
                <div>Phòng họp: Hội Trường B</div>
                <div>Chủ trì: BGĐ</div>
                <div>
                  Người tham dự: Đảng ủy & Ban giám đốc, Trưởng, phó các khoa,
                  phòng, ĐDT/KTVT các khoa, đại diện 22 chi bộ
                </div>
                <div>Người tạo: Nguyễn Việt Hùng</div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* <DynamicTable
        dataSource={prinfs?.data.prinfs}
        columns={columns}
        onRow={(record) => {
          navigate(`/sign-up-for-printer-repair/${record.id}`);
        }}
      />
      <div style={{ marginTop: "5px" }}></div>
      <PaginationCustom
        total={prinfs?.data?.meta?.total}
        current={page}
        pageSize={pageSize}
        onChange={(page: number, pageSize: number) => {
          handleChangPage(page, pageSize);
        }}
      /> */}
    </main>
  );
};

export default ListMeeting;
