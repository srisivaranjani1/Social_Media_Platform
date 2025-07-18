import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Landing.css";

const Landing = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     navigate('/profile'); // ✅ Redirect to profile if already logged in
  //   }
  // }, [navigate]);

  return (
    <div className="landing-container">
      <div className="overlay">
        <h1>Welcome to SECE Connect</h1>
        <p>A social platform for our SECE community</p>
        <div className="btn-group">
          <Link to="/login"><button className="btn">Login</button></Link>
          <Link to="/signup"><button className="btn">Sign Up</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
