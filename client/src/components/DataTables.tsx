import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';

export const DataTable = ({ userList, deleteUser }: any) => {

  // ✅ Columns must be inside the component so they can use props
  const columns: GridColDef[] = [
    { field: 'id', headerName: "ID", width: 70 },
    { field: 'firstName', headerName: "First Name", width: 150 },
    { field: 'lastName', headerName: "Last Name", width: 150 },
    { field: 'middleName', headerName: "Middle Name", width: 150 },
    { field: 'birthdate', headerName: "Birth Date", width: 150 },
    { field: 'email', headerName: "Email", width: 200 },
    { field: 'course', headerName: "Course", width: 200 },
    { field: "edit", headerName: "Edit", width: 100,
      renderCell: (params) => ( <Link to={`/edit/${params.row.id}`}>Edit</Link>),
    },
    { field: "delete", headerName: "Delete", width: 150, 
      renderCell: (params) => (
        <button
          onClick={async () => {
            if (window.confirm("Are you sure you want to delete this user?")) {
              await deleteUser(params.row.id);
            }
          }}>Delete</button>
        ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div style={{ margin: '1rem' }}>
      <Paper>
        <DataGrid
          rows={userList}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 15, 20]}
        />
      </Paper>
    </div>
  );
};
