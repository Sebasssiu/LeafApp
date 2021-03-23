import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../App'
import { useHistory } from 'react-router-dom'
import '../styles/inputPages.css'
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import { green } from '@material-ui/core/colors';
import useApi from '../customHooks/useApi'

const Login = () => {
    const history = useHistory()
    const [isLogin, setIsLogin] = useState(false)
    const [creadentials, setCredentials] = useState({ user: '', pass: '' })
    const token = useContext(UserContext)
    const data = useApi({
        link: 'api-token-auth/', 
        method: 'POST',
        body: {
            username: creadentials.user,
            password: creadentials.pass
        },
        call: isLogin
    })
    const tokenGetter = () => {
      if (data.fetchedData.token) {
        token.setToken(data.fetchedData.token)
        localStorage.setItem('token', data.fetchedData.token)
        localStorage.setItem('user_id', data.fetchedData.user_id)
        history.push('/')
      }
    }
    useEffect(() => {
      tokenGetter()
    }, [data.fetchedData])

    return (
      <div className="container">
        <img src="/bitfinex-leaf.svg" alt="logo" className="logo" />
        <div>
            <PersonIcon style={{ color: green[500], fontSize: 30}}/>
            <input 
                type="text"
                value = {creadentials.user}
                placeholder="Username"
                onChange = {e => setCredentials({...creadentials, user: e.target.value})}
            />
        </div>
        <div>
            <LockIcon style={{ color: green[500], fontSize: 30}}/>
            <input 
                type="password"
                value = {creadentials.pass}
                placeholder="Password"
                onChange = {e => setCredentials({...creadentials, pass: e.target.value})}
            />
        </div>
        <button onClick={() => setIsLogin(isLogin ? false : true)}>Log in</button>
      </div>
  )
}
export default Login