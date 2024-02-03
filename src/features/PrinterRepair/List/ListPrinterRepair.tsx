import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import { find } from "lodash";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { problemIndustries, prinf } from "../../../assets/data";
import DynamicTable from "../../../components/DynamicTable";
import PaginationCustom from "../../../components/Pagination/Pagination";
import StatusTag from "../../../components/StatusTag/StatusTag";
import { problemApi } from "../../../services/apis/problem";
import * as XLSX from "xlsx";

const ListPrinterRepair = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10); //muốn 1 trang có bao nhiêu phần tử thì bỏ vào đây
  const { data: problems, refetch } = useQuery({
    queryKey: ["problems"],
    queryFn: () =>
      problemApi.getAll({
        page: page,
        limit: pageSize,
      }),
    enabled: true,
  });

  const columns = [
    {
      title: "Khoa",
      dataIndex: "departmentName",
      key: "departmentName",
    },
    {
      title: "Loại máy in",
      dataIndex: "industry",
      key: "industry",
      render: (industry: string) => (
        <span>
          {
            find(
              prinf,
              (problemIndustry) => problemIndustry.value === industry
            )?.label
          }
        </span>
      ),
    },
    {
      title: "Vị trí",
      dataIndex: "title",
      key: "title",
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

  const exportToExcel = ({dataToExport}) => {
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "problems.xlsx");
  };

  return (
    <main>
      <div style={{ padding: "20px 0", float: "right" }}>
        <Button type="primary" style={{ height: "35px" }}>
          Tìm kiếm
        </Button>
        <Button
          type="primary"
          style={{ margin: "0 30px", height: "35px" }}
          onClick={() => exportToExcel(problems?.data.problems)}
        >
          <VerticalAlignBottomOutlined /> Excel
        </Button>
        <Button
          type="primary"
          style={{ height: "35px" }}
          onClick={() => {
            navigate("/sign-up-for-printer-repair/add");
          }}
        >
          Đăng ký sửa máy in
        </Button>
      </div>
      <DynamicTable
        dataSource={problems?.data.problems}
        columns={columns}
        onRow={(record) => {
          navigate(`/sign-up-for-printer-repair/${record.id}`);
        }}
      />
      <div style={{ marginTop: "5px" }}></div>
      <PaginationCustom
        total={problems?.data?.meta?.total}
        current={page}
        pageSize={pageSize}
        onChange={(page: number, pageSize: number) => {
          handleChangPage(page, pageSize);
        }}
      />
    </main>
  );
};

export default ListPrinterRepair;
