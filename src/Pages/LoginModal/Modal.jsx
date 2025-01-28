import React from 'react'

const Modal = () => {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    }


  return (
    <>
        <button onClick={toggleModal}>Open Modal</button>


    </>
  )
}

export default Modal
