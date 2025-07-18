import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/UsersPage.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5001/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        setMessage('❌ Failed to load users');
      }
    };

    fetchUsers();
  }, []);

  
   const handleAddFriend = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    console.log('Sending request to:', `http://localhost:5001/api/send-request/${userId}`);
    console.log('Token:', token);

    await axios.post(
      `http://localhost:5001/api/send-request/${userId}`, // ✅ CORRECT URL
      {}, // ✅ Empty body
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    alert('✅ Friend request sent!');
  } catch (err) {
    console.error('❌ Error sending request:', err.response?.data || err.message);
    alert(err.response?.data?.message || 'Something went wrong');
  }
};

  return (
    <div className="users-page">
      <h2>All SECE Users</h2>
      {message && <p>{message}</p>}
      {users.length === 0 ? (
        <p>No other users found.</p>
      ) : (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user._id} className="user-card">
              <div>
                <strong>{user.name}</strong>
                <p>{user.email}</p>
              </div>
              <button
                className="add-friend-btn"
                onClick={() => handleAddFriend(user._id)}
              >
                Add Friend
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersPage;
