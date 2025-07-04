import { useState } from "react";

export default function BulkUpload({ fetchUsers }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/api/users/bulk-upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Upload failed:\n" + (data.errors || data.error).join("\n"));
      } else {
        alert(data.message);
        fetchUsers(); // refresh list
      }
    } catch (err) {
      alert("Something went wrong!");
      console.error(err);
    }
  };

  return (
    <div style={{ margin: "2rem 0" }}>
      <h3>Bulk Upload Users</h3>
      <input type="file" accept=".xlsx" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
        Upload
      </button>
    </div>
  );
}
