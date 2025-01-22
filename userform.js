import React, { useState } from "react";

const UserForm = ({ user, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    id: user?.id || "",
    name: user?.name || "",
    email: user?.email || "",
    department: user?.department || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div>
      <h2>{user ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input name="name" value={formData.name} onChange={handleChange} required />
        <label>Email:</label>
        <input name="email" value={formData.email} onChange={handleChange} required />
        <label>Department:</label>
        <input name="department" value={formData.department} onChange={handleChange} />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default UserForm;
