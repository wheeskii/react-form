import { useEffect, useState } from "react"
import type { UserType } from "../validator/user.validator" 
import { deleteUser, getAllUsers } from "../api/fetch.api";
import { DataTable } from "../components/DataTables";
import "datatables.net";
import "datatables.net-dt";
import "datatables.net-responsive-dt";

export const UserList = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  
  
  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res);
    } catch (err) {
      console.error("Error fetching users: ", err);
    };
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      await fetchUsers();
    } catch (err) {
      console.error(err);
    };
  };
  

  useEffect(() => {
    fetchUsers();
    }, []);
  
  
  return (
    <div className="user-table">
      <DataTable userList={users} deleteUser={handleDeleteUser} />
    </div>
  )
}
