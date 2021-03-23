import React from 'react'

import ModalComponent from '../ModalComponent/ModalComponent'
import Button from '../Button/Button'
import './DeleteConfirmationModal.scss'
import '../../common.scss'

/**
 * Renders the modal to confirm deletion of an employee
 */
const DeleteConfirmationModal = ({ isOpen, closeModal, employee, deleteCallBack }) => {
    const name = `${employee.first_name} ${employee.last_name}`

    return (
        <ModalComponent isOpen={isOpen} closeModal={closeModal} title="Are you sure?">
            <div className="column">
                <span>Are you sure you want to delete {name} from the directory? This action cannot be undone.</span>
                <div className="buttonContainer">
                    <Button text="Yes, delete" buttonType="primary" onClick={deleteCallBack}/>
                    <div className="buttonMargin">
                        <Button text="No, cancel" buttonType="secondary" onClick={closeModal}/>
                    </div>
                </div>
            </div>
        </ModalComponent>
    )
}

export default DeleteConfirmationModal