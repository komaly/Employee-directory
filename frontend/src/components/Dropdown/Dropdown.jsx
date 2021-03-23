import React from 'react'

import _ from 'underscore'

import '../../common.scss'

/**
 * Renders a dropdown input with the list of the given options
 */
const Dropdown = ({ label, value, onChange, options }) => {
    const renderDropdownOptions = () => {
        return _.map(options, (option, index) => {
            return (
                <option key={index} value={option} className="black">{option}</option>
            )
        })
    }
    
    return (
        <div className="column">
            <span className="inputLabel">{label}</span>
            <select className={`${!value ? 'gray' : ''} input whiteBackground`} value={value} onChange={(e) => onChange(e.target.value)}>
                <option value="" disabled>Select {label.toLowerCase()}</option>
                {renderDropdownOptions()}
            </select>
        </div>
    )
}

export default Dropdown