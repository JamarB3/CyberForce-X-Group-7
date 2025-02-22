import React from 'react'
import EmailIcon from '../../assets/email.svg'
import './EmailLoginButton.css'

const EmailLoginButton = () => {
  return (
    <div className='emailLogin'>
        <img src={EmailIcon} alt="Google Icon"/> 
        <p className="description">Continue with Email/Password</p> 
    </div>

  )
}

export default EmailLoginButton
