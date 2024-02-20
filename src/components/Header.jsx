import React from 'react';
import './CSS/header.css'; 
import { clearCredential } from '../helper';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  function handleLogout(){
    clearCredential()
    navigate('/login')

  }
  return (
    <header className="header">
      <h2 className="title"><Link to='/'>DASHBOARD</Link></h2>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </header>
  );
}

export default Header;
