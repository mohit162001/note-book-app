import React, { useContext } from "react";
import "./CSS/notehistory.css";
import { Link } from "react-router-dom";
import noNotes_img from "../assets/nonotes.png";
import { TextContext } from "../Context/NoteBookContext";
function NoNote() {
  const {handleTextChange}  =useContext(TextContext)
  return (
    <div className="nonotes-container">
      <img src={noNotes_img} alt="" />
      <h2 id="nonotes-h2">No Data found</h2>
      <p id="nonotes-p1">
        Create a <span>Note</span> first
      </p>
      <p id="default-p2">
        <button className="create-btn">
          <Link onClick={()=>handleTextChange(true)} to="/">Create note</Link>
        </button>
      </p>
    </div>
  );
}

export default NoNote;
