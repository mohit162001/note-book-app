import React from 'react'
import './CSS/default.css'
import note_book_img from '../assets/note-book.png'
import { Link } from 'react-router-dom'
function Default() {
  return (
    <div className='default-container'>
    <img src={note_book_img} alt="" />
    <h2 id='default-h2'>No Note Selected</h2>
    <p id='default-p1'>Select a <span>Note</span> or get stared with new one</p>
    <p id='default-p2'>
        <button className='create-btn'><Link to='/note'>Create note</Link></button>
    </p>
</div>
  )
}

export default Default