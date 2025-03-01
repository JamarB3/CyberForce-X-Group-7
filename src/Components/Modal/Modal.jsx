import { useEffect } from 'react';
import './Modal.css'; // Make sure to import necessary styles
import GoogleLoginButton from '../GoogleLoginButton/GoogleLoginButton';
import EmailLoginButton from '../EmailLoginButton/EmailLoginButton';
import Logo from '../../assets/logoipsum-332.svg'

const Modal = ({ isOpen, onClose, setUser, setLoggedIn, children }) => {


  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;
  
  return (
    <div className="modal">
      <div className="overlay" onClick={onClose} />
      <div className="modal-content">
        <div className="close" onClick={onClose}>
          <span>&times;</span>
        </div>
        {/* <img src={Logo}/>  */}
        <h1>Welcome to InclusiFind</h1>
        <GoogleLoginButton setUser={setUser} setLoggedIn={setLoggedIn} toggleModal={onClose}/>

        <span>or</span>
        
        <input name="email" className="emailInput" placeholder='Email' type="email"   autocomplete="email"/>
        <input className="emailInput" placeholder='Password' type="password"   name="password" autocomplete="password"/>
        <EmailLoginButton />
      </div>
    </div>
  );
};

export default Modal;