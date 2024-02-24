import React from 'react'
import './CSS/userprofile.css'
function UserProfile() {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
  return (
    <div className='user-profile'>
        <div className='user-details'>
            <p className='user-profile-p'>User Name: <span>{username}</span></p>
            <p className='user-profile-p'>Email: &nbsp; {email}</p>
        </div>
    </div>
  )
}

export default UserProfile