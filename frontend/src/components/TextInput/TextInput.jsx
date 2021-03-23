import React from 'react'

import '../../common.scss'

/**
 * Renders a text input field
 */
const TextInput = ({ label, value, onChange }) => {
    return (
        <div className="column">
            <span className="inputLabel">{label}</span>
            <input className="input" type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={label} />  
        </div>
    )
}
export default TextInput