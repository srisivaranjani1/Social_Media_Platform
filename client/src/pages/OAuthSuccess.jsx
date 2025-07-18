
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const user = params.get('user');

    if (token && user) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', user); // user is already JSON stringified
      navigate('/profile');
    } else {
      navigate('/');
    }
  }, [navigate]);

  return <p style={{ textAlign: 'center' }}>🔄 Redirecting after login...</p>;
};

export default OAuthSuccess;
