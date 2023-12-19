import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { map } from "lodash";
import React from "react";

interface Column {
  title: string;
  dataIndex: string;
  key: string;
  render?: (value: any) => JSX.Element;
}

interface DynamicTableProps {
  columns: ColumnsType<Column>;
  dataSource: any[];
  onRow?: (record: any) => void;
  loading?: boolean;
}

const DynamicTable: React.FC<DynamicTableProps> = ({
  columns,
  dataSource,
  onRow,
  loading,
}) => (
  <section>
    <Table
      loading={loading}
      columns={columns}
      dataSource={map(dataSource, (item, index) => ({ ...item, key: index }))}
      pagination={false}
      onRow={(record) => ({
        onClick: () => {
          onRow?.(record);
        },
      })}
    />
  </section>
);

export default DynamicTable;
