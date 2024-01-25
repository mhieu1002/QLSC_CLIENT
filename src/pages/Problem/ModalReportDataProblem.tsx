import React, { useRef, RefObject } from "react";
import { useReactToPrint } from "react-to-print";
import { useQueryClient } from "@tanstack/react-query";
import ModalCommon from "../../components/Modal/Modal";
import { ProblemResponse } from "../../types/problem";
import moment from "moment";
import 'moment/locale/vi';
import { find } from "lodash";
import { problemIndustries } from "../../assets/data";
import StatusTag from "../../components/StatusTag";
import { Button } from "antd";

moment.locale('vi');

// Sử dụng định dạng mong muốn

interface ModalReportDataProblemProps {
  isModalOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const ModalReportDataProblem = (props: ModalReportDataProblemProps) => {
  const { isModalOpen, onOk, onCancel } = props;
  const printRef: RefObject<HTMLDivElement> = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  const queryClient = useQueryClient();
  const problem: ProblemResponse | undefined = queryClient.getQueryData([
    "problem",
  ]);

  if (!problem) return <></>;

  return (
    <div>
      <ModalCommon
        title="Bệnh viện Nhi Đồng 2"
        isOpen={isModalOpen}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Button type="primary" onClick={handlePrint}>
          In
        </Button>
        <div
          style={{
            width: "560px",
            height: "794px",
            paddingTop: "40px",
            paddingLeft: "60px",
            paddingRight: "20px",
            paddingBottom: "100px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            fontFamily: "Times New Roman",
          }}
          ref={printRef as React.MutableRefObject<HTMLDivElement>}
        >
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "45%",
                fontSize: "13px",
              }}
            >
              <span>BỆNH VIỆN NHI ĐỒNG 2</span>
              <span style={{ fontWeight: "700" }}>
                PHÒNG CÔNG NGHỆ THÔNG TIN
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "30px 0",
                fontWeight: "900",
                fontSize: "24px",
              }}
            >
              <span>PHIẾU GHI NHẬN SỰ CỐ</span>
            </div>
            <div
              style={{
                fontWeight: "700",
              }}
            >
              <span style={{fontSize: "15px"}}>Người đề xuất: </span>
              <span style={{fontSize: "15px"}}>{problem.adminUserName}</span>
            </div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: "700",
                paddingTop: "5px",
              }}
            >
              <span>Khoa - Phòng đề xuất xử lý sự cố: </span>
              <span>{problem.departmentName}</span>
            </div>
            <div
              style={{
                fontSize: "15px",
                marginTop: "5px",
              }}
            >
              <div style={{fontSize: "15px"}}>
                <span style={{ fontWeight: "700" }}>Vấn đề sự cố: </span>
                <span >{problem.title}</span>
              </div>
              <div style={{ fontSize: "15px" }}>
                <span style={{ fontWeight: "700" }}>Lãnh vực: </span>
                <span>
                  {
                    find(
                      problemIndustries,
                      (problemIndustry) =>
                        problemIndustry.value === problem.industry
                    )?.label
                  }
                </span>
              </div>
              <div style={{ fontSize: "14px", paddingTop: "5px" }}>
                <span style={{ fontWeight: "700" }}>Ngày đề xuất: </span>
                <span>{moment(problem.createdAt).format("DD/MM/YYYY")}</span>
              </div>
              <div style={{ fontSize: "14px", paddingTop: "5px", paddingRight: "20px"}}>
                <span style={{ fontWeight: "700" }}>Nội dung sự cố: </span>
                <span>{problem.note}</span>
              </div>
              <div
                style={{
                  fontSize: "14px",
                  paddingTop: "5px",
                }}
              >
                <span style={{ fontWeight: "700" }}>Trạng thái: </span>
                <StatusTag status={problem.status} />
              </div>
            </div>
            <div
              style={{
                marginTop: "5px",
                fontSize: "13px",
                fontWeight: "900",
                fontStyle: "italic",
                textDecoration: "underline",
              }}
            >
              Ghi chú:
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "14px",
                paddingTop: "15px",
                paddingRight: "25px",
                display: "flex",
                justifyContent: "end",
                fontStyle: "italic",
              }}
            >
              <span>{moment(problem.processingDate).format("[Ngày] DD [tháng] MM [năm] YYYY")}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "12px",
                margin: "0 10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontWeight: "700",
                }}
              >
                <span>Người tiếp nhận</span>
                <span style={{ marginTop: "60px" }}>{problem.reciever}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontWeight: "700",
                }}
              >
                <span>Phòng Công nghệ thông tin</span>
              </div>
            </div>
          </div>
        </div>
      </ModalCommon>
    </div>
  );
};

export default ModalReportDataProblem;
