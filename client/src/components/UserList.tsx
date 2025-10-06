import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/UserList.css'

type User = {
  id: number;
  name: string;
  email: string;
  birthdate: string;
  phoneNumber: string;
};

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:8000/api/users");
    setUsers(res.data);
  };

  const deleteUser = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await axios.delete(`http://localhost:8000/api/users/${id}`);
      fetchUsers(); // Refresh list
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user-list-container">
  <h2>All Users</h2>

  {users.length === 0 ? (
    <p className="no-users">No users found.</p>
  ) : (
    <table className="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Birthdate</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.birthdate}</td>
            <td>{u.phoneNumber}</td>
            <td>
              <div className="action-buttons">
                <Link to={`/edit/${u.id}`}>Edit</Link>
                <button onClick={() => deleteUser(u.id)}>Delete</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

  );
};
