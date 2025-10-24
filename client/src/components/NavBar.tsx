import { Link } from 'react-router-dom';
import '../styles/NavBar.style.css'

export const NavBar = () => {
    
    return (
        <nav className="navbar">
            <div className="navbar-title">
                <h2>USER API</h2>
            </div>
            <div>
                <Link to='/users' >Users</Link>
                <Link to='/create'>Create User</Link>

            </div>
            

        </nav>

    )
}

