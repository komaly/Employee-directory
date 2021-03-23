import React, { useState } from 'react'

import _ from 'underscore'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'

import { useStyles } from '../../materialStyles'
import { deleteEmployee } from '../../api'
import TableComponent from '../TableComponent/TableComponent'
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal'
import EditOrAddEmployee from '../EditOrAddEmployee/EditOrAddEmployee'
import { editEmployee, addEmployee } from '../../api'
import Button from '../Button/Button'
import './EmployeeTable.scss'
import '../../common.scss'

/**
 * Renders the table of employee data, including functionality to add, edit, or
 * delete an employee.
 */
const EmployeeTable = ({ employeeData, setDataUpdated }) => {
    const classes = useStyles()
    const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] = useState(false)
    const [openEditOrAddModal, setOpenEditOrAddModal] = useState(false)
    const [currEmployee, setCurrEmployee] = useState({})
    const [successOrErrorMessage, setSuccessOrErrorMessage] = useState('')
   
    const onCloseEditOrAddModal = () => {
        setOpenEditOrAddModal(false)
        setCurrEmployee({})
    }

    const onDeleteIcon = (employee) => {
        setSuccessOrErrorMessage('')
        setCurrEmployee(employee)
        setOpenDeleteConfirmationModal(true)
    }

    const deleteCallBack = async () => {
        const response = await deleteEmployee(currEmployee._id)
        const name = `${currEmployee.first_name} ${currEmployee.last_name}`
        const alertText = response.error ? `Error while deleting ${name} from the directory.` : `Successfully deleted ${name} from the directory.`

        setSuccessOrErrorMessage(alertText)
        setDataUpdated(true)
        setOpenDeleteConfirmationModal(false)
    }

    const clearDataAndOpenEditAddModal = () => {
        setSuccessOrErrorMessage('')
        setOpenEditOrAddModal(true)
    }

    const onEditIcon = (employee) => {
        setCurrEmployee(employee)
        clearDataAndOpenEditAddModal()
    }

    const onOpenAddModal = () => {
        setCurrEmployee({})
        clearDataAndOpenEditAddModal()
    }

    const submitCallback = async(data, id) => {
        onCloseEditOrAddModal()

        let response
        if (!!id) {
            response = await editEmployee(data, id)
        } else {
            response = await addEmployee(data)
        }
        
        const name = `${data.first_name} ${data.last_name}`
        const editedOrAdded = !!id ? 'edited' : 'added'
        const editOrAddError = !!id ? `Error while editing ${name}.` : 'Error while adding new employee.'
        const alertText = response.error ? editOrAddError : `Successfully ${editedOrAdded} ${name}.`

        setSuccessOrErrorMessage(alertText)
        setDataUpdated(true)
    }

    const getEditDeleteCell = (employee) => {
        return (
            <div>
                <EditIcon className={classes.editIcon} onClick={() => onEditIcon(employee)}/>
                <RemoveCircleOutlineIcon className={classes.deleteIcon} onClick={() => onDeleteIcon(employee)}/> 
            </div>
        )
    }

    const getAddressData = (address) => {
        return (
            <div className="column">
                <span>{address.street}</span>
                <span>{address.city.trim()}, {address.state.trim()}, {address.zip_code}</span>
                <span>{address.country}</span>
            </div>
        )
    }

    const getTableCellText = (text) => {
        return <span className="tableCellText">{text}</span>
    }

    const getTableData = () => {
        if (employeeData.length === 0) {
            return []
        }

        return _.map(employeeData, employee => {
            const name = `${employee.first_name} ${employee.last_name}`

            return {
                picture: {
                    label: <img src={employee.picture} alt="employee" width={128} height={128}/>,
                    sortByField: ''
                }, 
                name: {
                    label: getTableCellText(name),
                    sortByField: name
                },
                number: {
                    label: getTableCellText(employee.phone_number),
                    sortByField: employee.phone_number
                },
                email: {
                    label: getTableCellText(employee.email),
                    sortByField: employee.email
                },
                jobTitle: {
                    label: getTableCellText(employee.job_title),
                    sortByField: employee.job_title
                },
                department: {
                    label: getTableCellText(employee.department),
                    sortByField: employee.department
                },
                location: {
                    label: getAddressData(employee.address),
                    sortByField: ''
                },
                editDeleteCell: {
                    label: getEditDeleteCell(employee),
                    sortByField: ''
                }
            }
        })
    }

    const headerCells = [
        {id: '', label: ''},
        {id: 'name', label: 'Name'},
        {id: 'number', label: 'Phone number'},
        {id: 'email', label: 'Email'},
        {id: 'jobTitle', label: 'Job title'},
        {id: 'department', label: 'Department'},
        {id: '', label: 'Location'}
    ]
    const messageIsError = successOrErrorMessage.startsWith('Error')
    const buttonText = <span className="row centered"><AddIcon/> Add employee</span>

    return (
        <div>
            <div className="row">
                <span className={`${messageIsError ? 'errorText' : 'successText'} errorSuccessMargin`}>{successOrErrorMessage}</span>
                <Button text={buttonText} buttonType="custom" onClick={onOpenAddModal}/>
            </div>
            <TableComponent headerCells={headerCells} tableData={getTableData()} setSuccessOrErrorMessage={setSuccessOrErrorMessage} successOrErrorMessage={successOrErrorMessage}/>
            <DeleteConfirmationModal isOpen={openDeleteConfirmationModal} closeModal={() => setOpenDeleteConfirmationModal(false)} employee={currEmployee} deleteCallBack={deleteCallBack}/>
            <EditOrAddEmployee isOpen={openEditOrAddModal} closeModal={onCloseEditOrAddModal} employee={currEmployee} submitCallback={submitCallback}/>
        </div>
    )
}

export default EmployeeTable