import React, { useState, createContext } from 'react'
import Main from './views/main'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './views/login'

export const UserContext = createContext()

const App = () => {
  const [token, setToken] = useState('22')
  return (
    <UserContext.Provider value={{token: token, setToken: setToken}}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  )
}
export default App