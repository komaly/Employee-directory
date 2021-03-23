import React from 'react'

import './Button.scss'

/**
 * Renders a button with the given text and onClick set.
 * If buttonType is primary, button will be the standard blue.
 * If buttonType is secondary, button will be gray.
 * If buttonType is custom, button will be standard blue but will not have
 * a margin set to the span tag.
 */
const Button = ({ text, buttonType, onClick }) => {
    return (
        <button type="button" onClick={onClick} className={buttonType}>
            <span className={buttonType === 'custom' ? '': 'buttonText'}>{text}</span>
        </button>
    )
}

export default Button