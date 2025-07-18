import { useEffect, useState } from 'react';
import axios from 'axios';

const FriendRequests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5001/api/friend-requests', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('✅ Friend requests:', res.data);
        if (!Array.isArray(res.data)) {
          console.warn('⚠️ friendRequests response is not an array:', res.data);
        }
        setRequests(res.data);
        setLoading(false);
      } catch (err) {
        console.error('❌ Error fetching friend requests:', err);
        setError('Failed to load friend requests');
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (requesterId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5001/api/accept-request/${requesterId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('✅ Friend request accepted!');
      setRequests((prev) => prev.filter((r) => r._id !== requesterId));

    window.dispatchEvent(new Event("friendsUpdated"));


    } catch (err) {
      console.error('❌ Accept error:', err);
      alert('Error accepting friend request');
    }
  };

  return (
    <div>
      <h3>Friend Requests</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        requests.map((user) => (
          <div key={user._id}>
            <p>
              {user.name} ({user.email})
            </p>
            <button onClick={() => handleAccept(user._id)}>Accept</button>
          </div>
        ))
      )}
    </div>
  );
};

export default FriendRequests;
