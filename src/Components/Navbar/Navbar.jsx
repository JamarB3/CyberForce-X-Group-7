import React, {useState} from 'react'
import './Navbar.css'
import search from '../../assets/search.png'
import logoIpsum from '../../assets/logoipsum-332.svg'
import Modal from '../../Components/Modal/Modal'



const Navbar = () => {
    const [modal, setModal] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    
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

        <div className='navEnd flexBar'>
            <div className='signIn loginBox'>
                <p> Sign In </p>
            </div>
            <div className='Register loginBox'>
                <p> Register </p>
            </div>
        </div>
    

        </div>
    </nav>
  )
}

export default Navbar
