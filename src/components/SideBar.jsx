import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./CSS/sidebar.css";

function SideBar() {
  const { id } = useParams();
  const [text, setText] = useState(true);
  return (
    <aside className="sidebar-container">
      <nav className="sidebar">
        <p className="sidebar-title">Note Book</p>
        <ul className="sidebar-ul">
          {id ? (
            <li className="sidebar-list-item">
              <NavLink
                onClick={() => setText(true)}
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                to={`${id}`}
              >
                Update Note
              </NavLink>
            </li>
          ) : (
            <li className="sidebar-list-item">
              <NavLink
                onClick={() => setText(true)}
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                to="/"
              >
                {text ? "New Note" : "Add New Note"}
              </NavLink>
            </li>
          )}
          <li className="sidebar-list-item">
            <NavLink
              onClick={() => setText(false)}
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="/history"
            >
              History
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;
