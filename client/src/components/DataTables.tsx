
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { Paper } from '@mui/material';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

const columns: GridColDef[] = [
  { field: 'id', headerName: "ID", width: 70 },
  { field: 'firstName', headerName: "First Name", width: 150 },
  { field: 'lastName', headerName: "Last Name", width: 150 },
  { field: 'middleName', headerName: "Middle Name", width: 150 },
  { field: 'birthdate', headerName: "Birth Date", width: 150 },
  { field: 'email', headerName: "Email", width: 200 },
  { field: 'course', headerName: "Course", width: 200},
  { field: "edit", headerName: "Edit", width: 100, renderCell: () => <EditButton /> }, 
  { field: "delete", headerName: "Delete", width: 150, renderCell: () => <DeleteButton />} 
];

const paginationModel = { page: 0, pageSize: 5 };

export const DataTable = (props: any) => {
  const { userList } = props;

  return (
    <Paper>
      <DataGrid 
        rows={userList}
        columns={columns}
        initialState={{pagination: { paginationModel }}}
        pageSizeOptions={[5,10, 15, 20]}
      ></DataGrid>
    </Paper>
  )
};