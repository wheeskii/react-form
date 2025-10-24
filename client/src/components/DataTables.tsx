import { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";

export const DataTable = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLTableElement>(null);

  useEffect(() => {
    const table = $(ref.current!).DataTable({ responsive: true });
    return () => {
      table.destroy(true);
    };
  }, []);

  return (
    <table ref={ref} className="display nowrap" style={{ width: "100%" }}>
      {children}
    </table>
  );
};
