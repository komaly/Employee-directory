import React, { useState, useEffect, useRef } from 'react'

import _ from 'underscore'

import ModalComponent from '../ModalComponent/ModalComponent'
import TextInput from '../TextInput/TextInput'
import Dropdown from '../Dropdown/Dropdown'
import Button from '../Button/Button'
import { departments } from '../../constants/departments'
import { jobTitles } from '../../constants/jobTitles'
import './EditOrAddEmployee.scss'
import '../../common.scss'

/**
 * Renders the modal to either edit an employee or add a new employe
 */
const EditOrAddEmployee = ({ isOpen, closeModal, employee, submitCallback }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [department, setDepartment] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [country, setCountry] = useState('')
    const [errors, setErrors] = useState([])
    const [imageFile, setImageFile] = useState('')
    const imageUploader = useRef(null)

    useEffect(() => {
        if (!_.isEmpty(employee)) {
            setFirstName(employee.first_name)
            setLastName(employee.last_name)
            setPhoneNumber(employee.phone_number)
            setEmail(employee.email)
            setJobTitle(employee.job_title)
            setDepartment(employee.department)

            if (!!employee.address) {
                setStreet(employee.address.street)
                setCity(employee.address.city)
                setState(employee.address.state)
                setZipCode(employee.address.zip_code)
                setCountry(employee.address.country)
            }
        } else {
            setFirstName('')
            setLastName('')
            setPhoneNumber('')
            setEmail('')
            setJobTitle('')
            setDepartment('')
            setStreet('')
            setCity('')
            setState('')
            setZipCode('')
            setCountry('')
        }
    }, [employee, closeModal])

    const renderErrors = () => {
        return _.map(errors, (error, index) => {
            return <span className="errorText" key={index}>{error}</span>
        })
    }

    const emailDoesNotHaveValidCharacters = () => {
        return !email.includes('@') || !email.endsWith('.com')
    }

    const phoneNumberDoesNotHaveNumbers = () => {
        return phoneNumber !== '' && phoneNumber.replace( /^\D+/g, '') === ''
    }

    const isEmpty = (field) => {
        return field === ''
    }

    const isAFieldIsEmpty = () => {
        return isEmpty(firstName) || isEmpty(lastName) || isEmpty(phoneNumber) || isEmpty(email) || 
            isEmpty(jobTitle) || isEmpty(department) || isEmpty(street) || isEmpty(city) || 
            isEmpty(state) || isEmpty(zipCode) || isEmpty(country) || (isEmpty(imageFile) && _.isEmpty(employee))
    }

    const formValidation = () => {
        const errorsList = []

        if (isAFieldIsEmpty()) {
            errorsList.push('All fields must be filled.')
            setErrors(errorsList)
            return false
        }

        if (phoneNumberDoesNotHaveNumbers()) {
            errorsList.push('Phone number must contain numbers.')
        }

        if (emailDoesNotHaveValidCharacters()) {
            errorsList.push('Email must be valid format.')
        }

        setErrors(errorsList)
        return errorsList.length === 0
    }

    const onSubmit = () => {
        setErrors([])

        if (!formValidation()) {
            return
        }

        const data = {
            first_name: firstName,
            last_name: lastName,
            address: {
                street,
                city,
                state,
                country,
                zip_code: zipCode
            },
            phone_number: phoneNumber,
            email,
            picture: imageFile || employee.picture || '',
            job_title: jobTitle,
            department
        }
       
        const id = !_.isEmpty(employee) ? employee._id : ''
        submitCallback(data, id)
        setImageFile('')
    }

    const onClose = () => {
        setErrors([])
        setImageFile('')
        closeModal()
    }

    const handleImageUpload = (e) => {
        setImageFile(URL.createObjectURL(e.target.files[0]))
    }

    const modalTitle = !_.isEmpty(employee) ? `Edit ${employee.first_name} ${employee.last_name}'s information` : 'Add new employee'

    return (
        <ModalComponent isOpen={isOpen} closeModal={onClose} title={modalTitle}>            
            <div className="column">
                <img src={imageFile || employee.picture || ''} alt="employee" width={150} height={150} className={`${imageFile || employee.picture ? '': 'lightGrayBackground'} centeredContent`}/>
               
                <div className="centeredContent">
                    <input type="file" accept="image/*" multiple={false} ref={imageUploader} onChange={handleImageUpload} className="hideDisplay"/>
                    <div className="uploadButtonMargin">
                        <Button buttonType="primary" text="Upload profile picture" onClick={() => imageUploader.current.click()}/>
                    </div>
                </div>

                <div className="inputContainer">
                    <TextInput label="First name" value={firstName} onChange={setFirstName} />
                </div>

                <div className="inputContainer">
                    <TextInput label="Last name" value={lastName} onChange={setLastName} />
                </div>
                <div className="inputContainer">
                    <TextInput label="Phone number" value={phoneNumber} onChange={setPhoneNumber} />
                </div>
                <div className="inputContainer">
                    <TextInput label="Email" value={email} onChange={setEmail} />
                </div>
                <div className="inputContainer">
                    <Dropdown label="Job title" value={jobTitle} onChange={setJobTitle} options={jobTitles}/>
                </div>
                <div className="inputContainer">
                    <Dropdown label="Department" value={department} onChange={setDepartment} options={departments}/>
                </div>
                <div className="inputContainer">
                    <TextInput label="Street" value={street} onChange={setStreet} />
                </div>
                <div className="inputContainer">
                    <TextInput label="City" value={city} onChange={setCity} />
                </div>
                <div className="inputContainer">
                    <TextInput label="State" value={state} onChange={setState} />
                </div>
                <div className="inputContainer">
                    <TextInput label="Zip code" value={zipCode} onChange={setZipCode} />
                </div>
                <div className="inputContainer">
                    <TextInput label="Country" value={country} onChange={setCountry} />
                </div>

                {errors.length > 0 && (
                    <div className="column inputContainer">
                        {renderErrors()}
                    </div>
                )}
            </div>

            <div className="buttonContainer">
                <Button text="Submit" buttonType="primary" onClick={onSubmit}/>
            </div>
        </ModalComponent>
    )
}

export default EditOrAddEmployee