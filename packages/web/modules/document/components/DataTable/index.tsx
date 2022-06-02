import {
  createTable,
  getCoreRowModel,
  useTableInstance,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "./components";

type Value = Record<string, string | number | null>;

const table = createTable().setRowType<Value>();

interface Props {
  data: Value[];
}

const DataTable = ({ data }: Props) => {
  const columns = useMemo(() => {
    if (Array.isArray(data) && data.length > 0) {
      const keys = Object.keys(data[0]);

      return keys.map((key) => table.createDataColumn(key, {}));
    }

    return [];
  }, [data]);

  const instance = useTableInstance(table, {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <Table>
        <Thead>
          {instance.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : header.renderHeader()}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {instance.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>{cell.renderCell()}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default DataTable;
