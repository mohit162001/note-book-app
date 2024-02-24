import React, { useState } from 'react';
import './CSS/header.css'; 
import { clearCredential } from '../helper';
import { Link, useNavigate } from 'react-router-dom';
import user_icon from '../assets/user.png'
import UserProfile from './UserProfile';
function Header() {
  const [showUser,setShowUser] = useState(false);
  const navigate = useNavigate();
  function handleLogout(){
    clearCredential()
    navigate('/login')
  }
  function handleOpenUserProfile(){
    setShowUser((prev)=>!prev);
  }
  return (
    <>
    <header className="header">
      <h2 className="title"><Link to='/'>DASHBOARD</Link></h2>
      <div className={showUser? 'user-icon useractive':'user-icon'}>
        <img onClick={handleOpenUserProfile} src={user_icon} alt="" />
      </div>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </header>
        {showUser && <UserProfile/>}
    </>
  );
}

export default Header;
