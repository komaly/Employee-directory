import React, { useState, useEffect } from 'react'

import _ from 'underscore'
import { useHistory } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import { EmployeeTable, Button } from '../../components'
import { searchEmployees } from '../../api'
import '../../common.scss'

/**
 * Renders the search results page containing a table of the employee data 
 * with the functionality to add, remove, or delete an employee 
 */
const SearchResults = ({ location }) => {
    const history = useHistory()
    const state = location.state || { data: null, searchQuery: null }
    const { data, searchQuery } = state
    const [employeeData, setEmployeeData] = useState(data)
    const [dataUpdated, setDataUpdated] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (dataUpdated) {
            const getData = async() => {
                const employees = await searchEmployees(searchQuery)
                if (!employees.error) {
                    setEmployeeData(employees.data)
                } else {
                    setError(employees.error)
                }
            }
           
            getData()
            setDataUpdated(false)
        }
    }, [dataUpdated, searchQuery])

    const backToSearchOnClick = () => {
        history.push('/')
    }

    const renderResults = () => {
        const showNoDataDisplay = !employeeData || _.isEmpty(employeeData)

        if (showNoDataDisplay || error) {
            const buttonText = <span className="centeredRow"><ArrowBackIcon/> Back to search</span>
            const text = error ?   `Error retrieving search results: ${error}` : 'No employees match your search.'

            return (
                <div className="noEmployeeResultsContainer">
                    <span className={`${error ? 'errorText' : ''} noEmployeeResultsText`}>{text}</span>
                    {showNoDataDisplay && <Button text={buttonText} buttonType="custom" onClick={backToSearchOnClick}/>}
                </div>
            )
        }

        return <EmployeeTable employeeData={employeeData} setDataUpdated={setDataUpdated}/>
    }


    return renderResults()
}

export default SearchResults