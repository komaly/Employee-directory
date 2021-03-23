import React from 'react'

import { Switch, Route, useHistory } from 'react-router-dom'

import { Home, SearchResults, AllEmployees } from './screens'
import { Header } from './components'
import './App.scss'

/**
 * Renders the header and its content on all screens, and sets up the
 * routing for the apps components
 */
const App = () => {
  const history = useHistory()

  const redirectToAllEmployees = () => {
    history.push('/allEmployees')
  }

  const goToMainPage = () => {
    history.push('/')
  }

  return (
    <div>
      <Header title="Employee Directory" titleOnClick={goToMainPage} subTitle="View all employees" subTitleOnClick={redirectToAllEmployees}/>
      <div className="screenContainer">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search" exact component={SearchResults} />
          <Route path="/allEmployees" exact component={AllEmployees} />
        </Switch>
      </div>
    </div>
  );
}

export default App
