import React, { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";

export default function App() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/api/users");
    const data = await res.json();
    setUsers(data);
  };
  

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "2rem" }}>
      <h1>User Management System</h1>
      <UserForm fetchUsers={fetchUsers} editUser={editUser} setEditUser={setEditUser} />
      <UserTable users={users} fetchUsers={fetchUsers} setEditUser={setEditUser} />
    </div>
    
  );
}
