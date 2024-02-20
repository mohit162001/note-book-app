import React from 'react';
import { NavLink } from 'react-router-dom';
import './CSS/sidebar.css';


function SideBar() {
  return (
    <aside className="sidebar-container">
      <nav className="sidebar">   
        <p className='sidebar-title'>Note Book</p>       
        <ul className="sidebar-ul">
          <li className="sidebar-list-item">
            <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/note">New Note</NavLink>
          </li>
          <li className="sidebar-list-item">
            <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/history">History</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;
