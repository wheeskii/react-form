import { useEffect, useRef, useState } from "react"
import type { UserType } from "../validator/user.validator" 
import { getAllUsers } from "../api/fetch.api";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import '../styles/UserList.style.css'


export const UserList = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    getAllUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch(console.error);
  }, []);
    
  useEffect(() => {
    if (users.length > 0 && tableRef.current) {
      const table = $(tableRef.current).DataTable({
        responsive: true,
        destroy: true, // Allow reinit if re-rendered
        pageLength: 10,
        language: {
          search: "🔍 Search user:",
          lengthMenu: "Show _MENU_ per page",
        }
      });

      return () => {
        table.destroy(true);
      };
    }
  }, [users]);
  
  return (

    <>
    <div className="user-table">
      <table
        ref={tableRef}
        className="display nowrap"
        style={{ width: "100%" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Birthdate</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: UserType) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                { user.firstName } { user.middleName } { user.lastName }
              </td>
              <td>{ user.birthdate }</td>
              <td> { user.phoneNumber }</td>
              <td>{ user.email }</td>
              <td>{ user.course }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}
