import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaCommentDots, FaUserCircle, FaUserFriends } from 'react-icons/fa';
import '../styles/FeedPage.css';

const FeedPage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData && userData !== 'undefined') {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }

    // Optional: fetch posts from backend
    // axios.get('/api/posts').then(res => setPosts(res.data));
  }, [navigate]);

  return (
    <div className="feed-page">
      <header className="feed-header">
        <h1 className="app-title">SECE Connect</h1>
        <div className="header-icons">
          <FaPlus className="header-icon" onClick={() => navigate('/create')} />
          <FaCommentDots className="header-icon" onClick={() => navigate('/chat')} />
          <FaUserFriends className="header-icon" onClick={() => navigate('/users')} />
          <FaUserCircle className="header-icon" onClick={() => navigate('/profile')} />
        </div>
      </header>

      <main className="feed-content">
        {posts.length === 0 ? (
          <div className="no-posts">
            <FaCommentDots className="no-post-icon" />
            No posts yet
          </div>
        ) : (
          posts.map(post => (
            <div key={post._id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              {post.image && <img src={post.image} alt="Post" className="post-media" />}
              {post.video && (
                <video controls className="post-media">
                  <source src={post.video} type="video/mp4" />
                </video>
              )}
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default FeedPage;