import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProfilePage from './pages/ProfilePage';
import FeedPage from './pages/FeedPage';
import ChatPage from './pages/ChatPage';
import CreatePost from './pages/CreatePost';
import UsersPage from './pages/UsersPage';
import FriendRequests from './components/FriendRequests';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/requests" element={<FriendRequests/>}/>
      </Routes>
    </Router>
  );
}

export default App;