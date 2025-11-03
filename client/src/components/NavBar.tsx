import { Link, useNavigate } from "react-router-dom";
// import CustomButton from "./Button";
import "../styles/NavBar.style.css";
import { LogoutButton } from "./Button";

export const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  

  return (
    <nav className="navbar">
      <div className="navbar-title">
        <h2>USER API</h2>
      </div>

      <div className="navbar-links">
        {token ? (
          <>
            <Link to="/users">Users</Link>
            <Link to="/create">Create User</Link>
    
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};
