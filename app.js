import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);

  // Fetch users from the API
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch((error) => alert("Failed to fetch users!"));
  }, []);

  // Add user
  const addUser = (user) => {
    axios
      .post("https://jsonplaceholder.typicode.com/users", user)
      .then((response) => {
        setUsers([...users, response.data]);
        setFormVisible(false);
      })
      .catch((error) => alert("Failed to add user!"));
  };

  // Edit user
  const editUser = (user) => {
    axios
      .put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user)
      .then((response) => {
        setUsers(users.map((u) => (u.id === user.id ? response.data : u)));
        setFormVisible(false);
      })
      .catch((error) => alert("Failed to update user!"));
  };

  // Delete user
  const deleteUser = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => setUsers(users.filter((u) => u.id !== id)))
      .catch((error) => alert("Failed to delete user!"));
  };

  return (
    <div>
      <h1>User Management Dashboard</h1>
      <button onClick={() => { setFormVisible(true); setSelectedUser(null); }}>Add User</button>
      <UserList users={users} onEdit={setSelectedUser} onDelete={deleteUser} />
      {isFormVisible && (
        <UserForm
          user={selectedUser}
          onSave={selectedUser ? editUser : addUser}
          onClose={() => setFormVisible(false)}
        />
      )}
    </div>
  );
};

export default App;
