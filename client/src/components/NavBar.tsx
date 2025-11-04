import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.style.css";

export const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  // const expiry = localStorage.getItem("tokenExpiry");
  // console.log(token);
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/signin");
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">
        
        <h2><Link to={token ? '/users' : '/'}>USERS API</Link></h2>
      </div>

      <div className="navbar-links">
        {token ? (
          <>
            <Link to="/users">Users</Link>
            <Link to="/create">Create User</Link>
    
            <button onClick={handleLogout}>Signout</button>
            
          </>
        ) : (
          <Link to="/signin">Signin</Link>
        )}
      </div>
    </nav>
  );
};
