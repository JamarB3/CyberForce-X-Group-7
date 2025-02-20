

import React from "react";
import "./LoginModal.css";
import { RiCloseLine } from "react-icons/ri";
import { FormGroup} from "react-bootstrap";

  
const Modal = ({ setIsOpen }) => {
  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Login</h5>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className="modalContent">
            <div className="column" style={{ display: 'flex', flexDirection: 'column', padding: '50px'}}>
              <label htmlFor="email" style={{ marginBottom: '10px'}}>Email:</label>
              <input type="email" id="email" name="email" style={{ marginBottom: '10px'}}/>
              <label htmlFor="password" style={{ marginBottom: '10px'}} >Password:</label>
              <input type="password" id="password" name="password" style={{ marginBottom: '10px'}}/>
              <button
                  className="LoginBtn"
                >
                  Login
              </button>
            </div>
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button className="NewBtn" onClick={() => setIsOpen(false)}>
               Create New Account
              </button>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
  
export default Modal;
