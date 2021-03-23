import React from 'react'

import './Header.scss'

/**
 * Renders the header with the title and sub title, both with onClick functionality
 */
const Header = ({ title, titleOnClick, subTitle, subTitleOnClick }) => {
    return (
        <header>
            <div className="titleContainer">
                <h2 className="titleStyle" onClick={titleOnClick}>{title}</h2>
                <h4 className="linkStyle" onClick={subTitleOnClick}>{subTitle}</h4>
            </div>
        </header>
    )
}

export default Header