import React, { useEffect, useState } from "react";

import axios from "axios";

const Users: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]); // State for users
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data); // Assuming response.data is an array of users
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Error in fetching users");
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
