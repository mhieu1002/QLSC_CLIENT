import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Col, DatePicker, Row, Select, Button } from "antd";
import { find, map } from "lodash";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { problemIndustries } from "../../assets/data";
import DynamicTable from "../../components/DynamicTable";
import StatusTag from "../../components/StatusTag/StatusTag";
import { problemApi } from "../../services/apis/problem";
import ModalReportDataProblem from "./ModalReportDataProblem";
import { ProblemResponse } from "../../types/problem";
import PaginationCustom from "../../components/Pagination/Pagination";

const ProblemReportIndustry = () => {
  const { RangePicker } = DatePicker;
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [selectedIndustry, setSelectedIndustry] = useState();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10); 
  const queryClient = useQueryClient();

  const handleChangeDateRange = (formatString: [string, string]) => {
    setStartDate(formatString?.[0]);
    setEndDate(formatString?.[1]);
  };

  const { data: problemReport, refetch } = useQuery({
    queryKey: ["problemReport", selectedIndustry, startDate, endDate],
    queryFn: () =>
      problemApi.problemReport({
        startDate: moment(startDate).toDate(),
        endDate: moment(endDate).toDate(),
        industry: selectedIndustry,
        page: page,
        limit: pageSize
      }),
    enabled: false,
  });

  const handleConfirmClick = useCallback(() => {
    if (selectedIndustry && startDate && endDate) {
      refetch();
    }
  }, [endDate, refetch, selectedIndustry, startDate]);

  const columns = [
    {
      title: "Khoa",
      dataIndex: "departmentName",
      key: "departmentName",
    },
    {
      title: "Vấn đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Lãnh vực",
      dataIndex: "industry",
      key: "industry",
      render: (industry: string) => (
        <span>
          {
            find(
              problemIndustries,
              (problemIndustry) => problemIndustry.value === industry
            )?.label
          }
        </span>
      ),
    },
    {
      title: "Liên hệ",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Ngày đề xuất",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => (
        <span>{moment(createdAt).format("DD/MM/YYYY")}</span>
      ),
    },
    {
      title: "Người đề xuất",
      dataIndex: "adminUserName",
      key: "adminUserName",
    },
    {
      title: "Người tiếp nhận",
      dataIndex: "reciever",
      key: "reciever",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        return <StatusTag status={status} />;
      },
    },
  ];

  const handleChangPage = useCallback((page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  }, []);

  useEffect(() => {
    refetch();
  }, [page, pageSize, refetch]);

  return (
    <section>
      <div style={{ margin: "15px 0" }}>
        <Row gutter={[16, 16]}>
          <Col xl={8}>
            <Select
              style={{ width: "100%" }}
              placeholder="Vui lòng chọn lĩnh vực"
              options={
                map(problemIndustries, (industry) => ({
                  label: industry.label,
                  value: industry.value,
                })) || []
              }
              onChange={(value) => setSelectedIndustry(value)}
            />
          </Col>
          <Col xl={8}>
            <RangePicker
              style={{ width: "100%" }}
              onChange={(_, formatString: [string, string]) => {
                handleChangeDateRange(formatString);
              }}
            />
          </Col>
          <Col xl={8}>
            <Button
              onClick={() => {
                handleConfirmClick();
              }}
            >
              Xác nhận
            </Button>
          </Col>
        </Row>
      </div>

      <DynamicTable
        dataSource={problemReport?.data.data}
        columns={columns}
        onRow={(record) => {
          queryClient.setQueryData(["problem"], record);
          setIsModalOpen(true);
        }}
      />
       <PaginationCustom
        total={problemReport?.data?.meta?.total}
        current={page}
        pageSize={pageSize}
        onChange={(page: number, pageSize: number) => {
          handleChangPage(page, pageSize);
        }}
      />
      <ModalReportDataProblem
        isModalOpen={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      ></ModalReportDataProblem>
    </section>
  );
};

export default ProblemReportIndustry;
