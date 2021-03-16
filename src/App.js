import React, { useState, createContext } from 'react'
import Main from './views/main'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './views/login'
import Profile from './views/profile'
import SignUp from './views/signup'
import Search from './views/search'

export const UserContext = createContext()

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))
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
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/music">
            <SignUp />
          </Route>
          <Route exact path='/search'>
            <Search/>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  )
}
export default App