import './UserButton.css'
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router';
import { useAuth } from '../context/auth';

export const UserButton = () => {
    const { logout } = useAuth()

    return (
        <div className='user-container'>
            <FaUserCircle className="user-button"/>
            <div className="dropdown-menu">
                <Link to='/dashboard' className='home-button' >Dashboard</Link>
                <span onClick={() => logout()} className='logout-button' >Cerrar sesión</span>
            </div>
        </div>
    )
}