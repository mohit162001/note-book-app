import React from 'react'
import './CSS/notehistory.css'
import { Link } from 'react-router-dom'
import noNotes_img from '../assets/nonotes.png'
function NoNote() {
  return (
    <div className="nonotes-container">
            <img src={noNotes_img} alt="" />
            <h2 id="nonotes-h2">No Data found</h2>
            <p id="nonotes-p1">
              Create a <span>Note</span> first
            </p>
            <p id="default-p2">
              <button className="create-btn"><Link to='/'>Create note</Link></button>
            </p>
          </div>
  )
}

export default NoNote