import axios from 'axios'

const { REACT_APP_NODE_URL } = process.env

// Resolves the fetch promise and sets data and error on the resulting object
// based on the promise response
export const resolve = async(promise) => {
    const resolved = {
        data: null,
        error: null
    }
    
    try {
        resolved.data = await promise
    } catch(e) {
        resolved.error = e.message
    }

    return resolved;
}

// Gets all employees in the database
export const getEmployees = async() => {
    return await resolve(axios.get(REACT_APP_NODE_URL).then((res) => res.data))
}

// Deletes an employee in the database given the employee id
export const deleteEmployee = async(id) => {
    return await resolve(axios.delete(`${REACT_APP_NODE_URL}/delete`, { data: { id } }).then((res) => res.data))
}

// Uses the given id to find and edit the corresponding emplooyee with the given updated data
export const editEmployee = async(employeeData, id) => {
    return await resolve(axios.put(`${REACT_APP_NODE_URL}/edit`, { data: { id, employeeData } }).then((res) => res.data))
}

// Adds an employee to the database with the given data
export const addEmployee = async(employeeData) => {
    return await resolve(axios.post(`${REACT_APP_NODE_URL}/add`, { data: { employeeData } }).then((res) => res.data))
}

// Searches all employees in the database with the given query
export const searchEmployees = async(searchQuery) => {
    return await resolve(axios.get(`${REACT_APP_NODE_URL}/search/${searchQuery}`).then((res) => res.data))
}