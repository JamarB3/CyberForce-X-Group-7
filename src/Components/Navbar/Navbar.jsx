import React, {useState, useEffect} from 'react'
import './Navbar.css'
import search from '../../assets/search.png'
import logoIpsum from '../../assets/logoipsum-332.svg'
import Modal from '../../Components/Modal/Modal'
import GoogleLoginButton from '../GoogleLoginButton/GoogleLoginButton'
import EmailLoginButton from '../EmailLoginButton/EmailLoginButton'
import PopupMenu from '../PopupMenu/PopupMenu'



const Navbar = ({ loggedIn, setLoggedIn, user, setUser }) => {
    /* React Hooks and functions for sign in/login modal. */
    const [modal, setModal] = useState(false);
    const [accountPopup, setAccountPopup] = useState(false);
    // const [user, setUser] = useState(null);
    // const [loggedIn, setLoggedIn] = useState(false);


    const toggleModal = () => {
        setModal(!modal);
      }

      const togglePopup = () => {
        setAccountPopup(!accountPopup);
      }
    
    useEffect(() => {
    if (user) {
        console.log("Google login data:", user);
    }
    }, [user]);



    
  return (
    <nav>
        <div className='flexBar'>

            <div className='navLeft flexBar'>
                <div className="logo">
                    <img src={logoIpsum} alt="logo"/>
                </div>
                <div className='searchBox'>
                    <input type="text" placeholder='Find Minority Businesses'/>
                    <img src={search} alt="search"/>
                </div>
            </div>

        <div className='navRight flexBar'>
            <div className='navItem'>
                <p>Businesses</p>
            </div>
            <div className='navItem'>
                <p>Community</p>
            </div>
            <div className='navItem'>
                <p>Resources</p>
            </div>
        </div>

        {/* <div className='navEnd flexBar'>
            <div className='signIn loginBox' onClick={() => toggleModal()}>
                <p> Sign In </p>
            </div>
            <div className='Register loginBox' onClick={() => toggleModal()}>
                <p> Register </p>
            </div>
        </div> */}


        {loggedIn ? (
        <div className="profile" onClick={togglePopup}>
            <div className="profile-text">
                {/* <p>Chrisxz</p> */}
            </div>
            <img 
            src={user?.picture || "https://picsum.photos/200/300"} 
            alt="Profile" />            
            <PopupMenu accountPopup={accountPopup} user={user}/>
        </div>
        ) : (
        <div className="navEnd flexBar">
            <div className="signIn loginBox" onClick={() => toggleModal()}>
            <p>Sign In</p>
            </div>
            <div className="Register loginBox" onClick={() => toggleModal()}>
            <p>Register</p>
            </div>
        </div>
        )}
    

        </div>
                    {/* Adding the Modal Component */}
            <Modal isOpen={modal} onClose={toggleModal} setUser={setUser} setLoggedIn={setLoggedIn} />

    </nav>


  )
}

export default Navbar
