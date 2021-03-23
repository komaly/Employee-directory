import React, { useEffect } from 'react'

import Modal from 'react-modal'
import CloseIcon from '@material-ui/icons/Close'

import './ModalComponent.scss'

/**
 * Renders the common modal component containing the title and close icon
 */
const ModalComponent = ({ isOpen, closeModal, title, children }) => {
    useEffect(() => {
       Modal.setAppElement('body')
    })
    
    return (
        <Modal isOpen={isOpen} className="modal">
            <div className="modalContent">
                <div className="modalTitleContainer">
                    <h3>{title}</h3>
                    <h2 className="closeIcon" onClick={closeModal}><CloseIcon/></h2>
                </div>
                {children}
            </div>
        </Modal>
    )
}

export default ModalComponent