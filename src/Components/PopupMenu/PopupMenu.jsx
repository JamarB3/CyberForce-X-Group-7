import React from 'react'
import './PopupMenu.css'
import logout from'../../assets/logout.svg'
import profile_image from '../../assets/Coffee-png.png'
import Settings from '../../assets/settings.svg'

const PopupMenu = ({accountPopup, user}) => {

  if (!accountPopup) return null;
  return (
    <div className='account-popup'>
      <div className="account-pop1">
        <div className='block1'>
          <img src={user?.picture || "https://picsum.photos/200/300"} />
        </div>
        <div className='block2'>
          <h3>Chrisxz</h3>
          <h4>cb@bison.howard.edu</h4>
        </div>

      </div>
      <div className='account-pop2'>
        <div className='account-options-popup'>
          <img src={Settings}/>
          <span>Profile Settings</span>
        </div>
        
        <div className='account-options-popup'>
          <img src={logout}/>
          <span>Sign Out</span>
        </div>
      </div>
    </div>
  )
}

export default PopupMenu
