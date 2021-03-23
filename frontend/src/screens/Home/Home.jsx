import React, { useState, useEffect, useCallback, useRef } from 'react'

import { useHistory } from 'react-router-dom'

import { Button } from '../../components'
import { searchEmployees } from '../../api'
import './Home.scss'
import '../../common.scss'

/**
 * Renders the main screen containing the search bar to search
 * for employees in the directory
 */
const Home = () => {
    const history = useHistory()
    const [searchQuery, setSearchQuery] = useState('')
    const [error, setError] = useState('')
    const searchBar = useRef(null)

    useEffect(() => {
        searchBar.current.focus()
    }, [])

    const onSubmit = useCallback(async() => {
        if (!searchQuery) {
            setError('Search field must be filled.')
            return
        }

        const response = await searchEmployees(searchQuery)
        if (!response.error) {
            setError('')
            history.push('/search', { data: response.data, searchQuery })
        } else {
            setError(response.error)
        }
    }, [history, searchQuery])

    useEffect(() => {
        const handleUserKeyPress = (e) => {
            if (e.keyCode === 13 && searchQuery) {
                onSubmit()
            }
        }

        window.addEventListener('keydown', handleUserKeyPress)
    
        return () => {
          window.removeEventListener('keydown', handleUserKeyPress)
        }
      }, [onSubmit, searchQuery])

    return (
        <div className="homeContentContainer">
            <h2>Enter your search query:</h2>
            <div className="column">
                <div className="row">
                    <div className="searchBarContainer">
                        <input
                            className="searchBar"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                            ref={searchBar}
                        />
                    </div>
                    <Button text="Submit" buttonType="primary" onClick={onSubmit}/>
                </div>
                {!!error && <span className="errorText">{error}</span>}
            </div>
        </div>
    )
}

export default Home
