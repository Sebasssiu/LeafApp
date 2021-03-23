import React, { useState, useEffect } from 'react'
import '../styles/inputPages.css'
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import { green } from '@material-ui/core/colors';
import useApi from '../customHooks/useApi'
import { useHistory } from 'react-router-dom'

const Signup = () => {
    const history = useHistory()
    const [credentials, setCredentials] = useState({user: '', pass: '', rePass: ''})
    const [isSignup, setIsSignup] = useState(false)
    const [validation, setValidation] = useState(false)
    const userPost = useApi({
        link: 'user/', 
        method: 'POST',
        body: {
            username: credentials.user,
            password: credentials.pass
        },
        call: isSignup
    })
    useEffect(() => {
        if (isSignup) history.push('/')
    }, [isSignup])
    const signup = () => {
        if (credentials.pass === credentials.rePass && credentials.pass !== '' && credentials.user !== '') {
            setIsSignup(true)
        } 
        if (credentials.pass !== credentials.rePass) {
          setValidation(true)
        }
    }

    if (userPost.isLoading) {
      return (
        <div className="container">
          <div className="loading"/>
        </div>
      )
    }
    return (
        <div className="container">
            <img src="/bitfinex-leaf.svg" alt="logo" className="logo" />
            <div>
                <PersonIcon style={{ color: green[500], fontSize: 30}}/>
                <input 
                    type="text"
                    value = {credentials.user}
                    placeholder="Username"
                    onChange = {e => setCredentials({...credentials, user: e.target.value})}
                />
            </div>
            <div>
                <LockIcon style={{ color: green[500], fontSize: 30}}/>
                <input 
                    type="password"
                    value = {credentials.pass}
                    placeholder="Password"
                    onChange = {e => setCredentials({...credentials, pass: e.target.value})}
                />
            </div>
            <div>
                <LockIcon style={{ color: green[500], fontSize: 30}}/>
                <input 
                    type="password"
                    value = {credentials.rePass}
                    placeholder="Re-enter password"
                    onChange = {e => setCredentials({...credentials, rePass: e.target.value})}
                />
            </div>
            {validation ? (
              <h4 className="error">That username already exists or the password confirmation is wrong</h4>
            ) : null}
            <button onClick={signup}>Sign up</button>
        </div>
    )
}
export default Signup 