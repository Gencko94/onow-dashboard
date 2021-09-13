import { useState } from "react";

export const useToggleRows = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const handleToggleRows = (rowId: number) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows((prev) => prev.filter((i) => i !== rowId));
    } else {
      setSelectedRows((prev) => [...prev, rowId]);
    }
  };
  const handleClearRows = () => {
    setSelectedRows([]);
  };
  return { selectedRows, handleToggleRows, handleClearRows };
};
