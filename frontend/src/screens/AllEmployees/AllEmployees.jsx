import React, { useEffect, useState } from 'react'

import AddIcon from '@material-ui/icons/Add'
import _ from 'underscore'

import { EmployeeTable, Button, EditOrAddEmployee } from '../../components'
import { getEmployees, addEmployee } from '../../api'
import '../../common.scss'

/**
 * Renders the view all employees screen containing the table with all employee data, and the
 * functionality to add, update, or delete an employee
 */
const AllEmployees = () => {
    const [employeeData, setEmployeeData] = useState([])
    const [dataUpdated, setDataUpdated] = useState(true)
    const [openAddModal, setOpenAddModal] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (dataUpdated) {
            const getData = async() => {
                const employees = await getEmployees()
                if (!employees.error) {
                    setEmployeeData(employees.data)
                }
            }
           
            getData()
            setDataUpdated(false)
        }
    }, [dataUpdated])

    const addEmployeeCallback = async(data, _id) => { 
        const response = await addEmployee(data)
        if (!response.error) {
            setError('')
            setDataUpdated(true)
        } else {
            setError(response.error)
        }

        setOpenAddModal(false)
    }

    const renderResults = () => {
        const showNoDataDisplay = !employeeData || _.isEmpty(employeeData)
    
        if (showNoDataDisplay || error) {
            const buttonText = <span className="centeredRow"><AddIcon/> Add employee</span>
            const text = error ? `Error adding employee: ${error}` : 'No employees in the directory.'

            return (
                <div className="noEmployeeResultsContainer">
                    <span className={`${error ? 'errorText' : ''} noEmployeeResultsText`}>{text}</span>
                    <Button text={buttonText} buttonType="custom" onClick={() => setOpenAddModal(true)}/>
                    <EditOrAddEmployee isOpen={openAddModal} closeModal={() => setOpenAddModal(false)} employee={{}} submitCallback={addEmployeeCallback}/>
                </div>
            )
        }

        return <EmployeeTable employeeData={employeeData} setDataUpdated={setDataUpdated}/>
    }

    return renderResults()
}

export default AllEmployees