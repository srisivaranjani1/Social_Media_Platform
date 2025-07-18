import React, { useEffect, useState } from 'react';
import '../styles/ProfilePage.css';
import axios from 'axios';
import FriendRequests from '../components/FriendRequests';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [showRequests, setShowRequests] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    try {
      const userData = localStorage.getItem('user');
      if (userData && userData !== 'undefined') {
        setUser(JSON.parse(userData));
      } else {
        console.warn('⚠️ User not found or invalid in localStorage.');
      }
    } catch (err) {
      console.error('❌ Failed to parse user from localStorage:', err);
    }
  }, []);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5001/api/friends', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFriends(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch friends:', err);
      }
    };

    fetchFriends();

    // 🔁 Update on friend acceptance
    const handler = () => fetchFriends();
    window.addEventListener("friendsUpdated", handler);
    return () => window.removeEventListener("friendsUpdated", handler);
  }, []);

  if (!user) {
    return <div style={{ textAlign: 'center', marginTop: '2rem' }}>⚠️ User not logged in.</div>;
  }

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff&size=128&rounded=true`;

  return (
    <div className="profile-page">
      <header className="header">
        <h1>SECE Connect</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="request-toggle-btn" onClick={() => setShowRequests(!showRequests)}>
            {showRequests ? 'Hide Friend Requests' : 'View Friend Requests'}
          </button>
          <button className="request-toggle-btn" onClick={() => setShowFriends(!showFriends)}>
            {showFriends ? 'Hide My Friends' : 'View My Friends'}
          </button>
        </div>
      </header>

      <div className="profile-details">
        <img src={avatarUrl} alt="Profile" className="profile-image" />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p className="bio">Hey there! 👋 I’m a proud member of SECE. Let's connect!</p>
      </div>

      <div className="tabs">
        <div className="tab active">My Posts</div>
        <div className="tab">Settings</div>
      </div>

      <button className="edit-button">Edit Profile</button>

      {/* Friend Requests Section */}
      {showRequests && (
        <div style={{ marginTop: '1rem' }}>
          <FriendRequests />
        </div>
      )}

      {/* Friends Section */}
      {showFriends && (
        <div className="friends-section" style={{ marginTop: '2rem' }}>
          <h3>👥 My Friends</h3>
          {friends.length === 0 ? (
            <p>No friends yet</p>
          ) : (
            <ul>
              {friends.map((friend) => (
                <li key={friend._id}>
                  <strong>{friend.name}</strong> ({friend.email})
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
