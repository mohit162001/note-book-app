import React, { useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./CSS/sidebar.css";
import { TextContext } from "../Context/NoteBookContext";

function SideBar() {
  const { id } = useParams();
  const {textState,handleTextChange} = useContext(TextContext)
  console.log(textState)
  return (
    <aside className="sidebar-container">
      <nav className="sidebar">
        <p className="sidebar-title">Note Book</p>
        <ul className="sidebar-ul">
          {id ? (
            <li className="sidebar-list-item">
              <NavLink
                onClick={() => handleTextChange(true)}
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                to={`${id}`}
              >
                Update Note
              </NavLink>
            </li>
          ) : (
            <li className="sidebar-list-item">
              <NavLink
                onClick={() => handleTextChange(true)}
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                to="/"
              >
                {textState ? "New Note" : "Add New Note"}
              </NavLink>
            </li>
          )}
          <li className="sidebar-list-item">
            <NavLink
              onClick={() => handleTextChange(false)}
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
