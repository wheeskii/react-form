import { useEffect, useState } from "react"
import type { UserType } from "../validator/user.validator" 
import { getAllUsers } from "../api/fetch.api";
import "datatables.net";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import '../styles/UserList.style.css'
import { DataTable } from "../components/DataTables";



export const UserList = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    getAllUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch(console.error);
    }, []);
  
  
  return (
    <div className="user-table">
      <DataTable userList={users} />
    </div>
  )
}
