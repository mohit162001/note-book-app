import React from 'react'
import { Link } from 'react-router-dom'
import './CSS/navigation.css'
function Navigation() {
  return (
    <div>
        <nav className="sidebar">   
         <p className='title'>ONLINE SHOP</p>       
          <ul className="sidebar-ul">
            <li className="sidebar-list-item">
              <Link className="sidebar-link" to="/">Dashboard</Link>
            </li>
            <li className="sidebar-list-item">
              <Link className="sidebar-link" to="/history">History</Link>
            </li>
          </ul>
        </nav>
      </div>
  )
}

export default Navigation;