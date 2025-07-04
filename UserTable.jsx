import React from "react";

export default function UserTable({ users, fetchUsers, setEditUser }) {
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure to delete?");
    if (!confirm) return;

    try {
      await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
      });
      fetchUsers();
    } catch (err) {
      alert("Failed to delete user");
      console.error(err);
    }
  };

  return (
    <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>First</th>
          <th>Last</th>
          <th>Email</th>
          <th>Phone</th>
          <th>PAN</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan="6" style={{ textAlign: "center" }}>
              No users found
            </td>
          </tr>
        ) : (
          users.map((u) => (
            <tr key={u.id}>
              <td>{u.first}</td>
              <td>{u.last}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{u.pan}</td>
              <td>
                <button onClick={() => setEditUser(u)}>Edit</button>
                <button onClick={() => handleDelete(u.id)} style={{ marginLeft: "10px" }}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
