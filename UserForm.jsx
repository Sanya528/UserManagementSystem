import { useState, useEffect } from "react";

export default function UserForm({ fetchUsers, editUser, setEditUser }) {
  const [form, setForm] = useState({
    first: "",
    last: "",
    email: "",
    phone: "",
    pan: "",
  });

  const [showPan, setShowPan] = useState(false);

  useEffect(() => {
    if (editUser) setForm(editUser);
  }, [editUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^\d{10}$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

    if (!form.first || !form.last || !form.email || !form.phone || !form.pan)
      return "All fields required.";
    if (!emailRegex.test(form.email)) return "Invalid email.";
    if (!phoneRegex.test(form.phone)) return "Phone must be 10 digits.";
    if (!panRegex.test(form.pan))
      return "PAN must be 5 letters, 4 digits, 1 letter.";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      alert(error);
      return;
    }

const url = editUser
  ? `http://localhost:5000/api/users/${editUser.id}`
  : "http://localhost:5000/api/users";

const method = editUser ? "PUT" : "POST";


    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      alert("User saved successfully!");
      setForm({ first: "", last: "", email: "", phone: "", pan: "" });
      setEditUser(null);
      fetchUsers();
    } catch (err) {
        alert("Error saving user");
        console.error("Save error:", err); // <---- ADD THIS LINE
        }

  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <input
        name="first"
        placeholder="First Name"
        value={form.first}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: "1rem", padding: "10px" }}
      />
      <input
        name="last"
        placeholder="Last Name"
        value={form.last}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: "1rem", padding: "10px" }}
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: "1rem", padding: "10px" }}
      />
      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: "1rem", padding: "10px" }}
      />

      {/* PAN with eye icon toggle */}
      <div style={{ position: "relative", marginBottom: "1rem" }}>
        <input
          type={showPan ? "text" : "password"}
          name="pan"
          placeholder="PAN Number"
          value={form.pan}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            paddingRight: "40px",
            fontSize: "1rem",
            boxSizing: "border-box",
          }}
        />
        <button
          type="button"
          onClick={() => setShowPan(!showPan)}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <img
            src={
              showPan
                ? "https://iconmonstr.com/wp-content/releases/preview/2018/240/iconmonstr-eye-off-thin.png"
                : "https://iconmonstr.com/wp-content/releases/preview/2017/240/iconmonstr-eye-9.png"
            }
            alt="toggle visibility"
            style={{ width: "20px", height: "20px" }}
          />
        </button>
      </div>

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        {editUser ? "Update" : "Add"} User
      </button>
    </form>
  );
}
