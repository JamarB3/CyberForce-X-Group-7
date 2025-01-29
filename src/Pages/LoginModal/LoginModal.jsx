import React from 'react'
import {useState} from 'react'
import 'LoginModal.css'
import {Modal, Button} from 'react-bootstrap'

const LoginModal = () => {
const [show, setShow] = useState(false);
  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h1>Welcome</h1>
            <Input></Input>
        </Modal.Body>
       
      </Modal>
  )
}

export default LoginModal

