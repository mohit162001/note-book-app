import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/sidebar.css';

function SideBar() {
  return (
    <aside className="sidebar-container">
      <nav className="sidebar">   
        <p className='sidebar-title'>Note Book</p>       
        <ul className="sidebar-ul">
          <li className="sidebar-list-item">
            <Link className="add-note-btn" to="/note">New Note</Link>
          </li>
          <li className="sidebar-list-item">
            <Link className="sidebar-link" to="/history">History</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;
