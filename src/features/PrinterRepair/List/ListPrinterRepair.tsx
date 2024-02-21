import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import { find } from "lodash";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { problemIndustries } from "../../../assets/data";
import DynamicTable from "../../../components/DynamicTable";
import PaginationCustom from "../../../components/Pagination/Pagination";
import StatusTag from "../../../components/StatusTag/StatusTag";
import { prinfApi } from "../../../services/apis/prinf";
import * as XLSX from "xlsx";

const ListPrinterRepair = () => {
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

  const columns = [
    {
      title: "Khoa",
      dataIndex: "departmentName",
      key: "departmentName",
    },
    {
      title: "Máy in",
      dataIndex: "prinf",
      key: "prinf",
    },
    {
      title: "Phòng",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Ngày đăng ký",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => (
        <span>{moment(createdAt).format("DD/MM/YYYY")}</span>
      ),
    },
    {
      title: "Người đăng ký",
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

  const exportToExcel = (dataToExport) => {
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "prinf.xlsx");
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
          onClick={() => exportToExcel(prinfs?.data.prinfs)}
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
      <h2
        style={{
          paddingTop: "70px",
          paddingBottom: "10px",
          paddingLeft: "10px",
        }}
      >
        Đăng ký sửa máy in
      </h2>
      <DynamicTable
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
      />
    </main>
  );
};

export default ListPrinterRepair;
