import React, { useState, useContext } from 'react'
import { UserContext } from '../App'
import { useHistory } from 'react-router-dom'
import useApi from '../customHooks/useApi'
import '../styles/userMonitor.css'

const UserMonitor = () => {
  const context = useContext(UserContext)
  const history = useHistory()
  const [user, setUser] = useState('')
  const [monitor, setMonitor] = useState('')
  const [data, setData] = useState({fetchedData: {}, isLoading: true})
  const userData =  useApi({
    link: 'user/',
    method: 'GET',
  })
  const monitors = useApi({
    link: 'monitor/',
    method: 'GET',
  })

  const makeMonitor = () => {
    const body = {
      user_id: user,
      monitor_id: monitor,
      modified_id: context.user_id
    }
    fetch(`https://leaf-musicapp.herokuapp.com/user/createmonitor/`,{
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(response => setData({fetchedData: response, isLoading: false}))
        .catch(error => setData({...data, error: error}))
    alert("Se ha vinculado el perfil con exito.")
    history.push('/profile')
  }

  if (userData.isLoading || monitors.isLoading) {
    return (
      <div className="container">
        <div className="loading"/>
      </div>
    )
  }
  return (
    <div className="container">
      <h1>Link a monitor profile with an existing user</h1>
      <h3 className="title-selection">Select a user</h3>
      <select
          className="userListSelection"
          onChange={(e) => setUser(e.target.value)}
        >
          <option value="empty">Select a user</option>
          {userData.fetchedData.map((detail, index) => {
            return (
              <option key={index.toString()} value={detail.id}>
                {detail.username}
              </option>
            );
          })}
        </select>
        <h3 className="title-selection">Select a monitor profile</h3>
      <select
          className="userListSelection"
          onChange={(e) => setMonitor(e.target.value)}
        >
          <option value="empty">Select a monitor profile</option>
          {monitors.fetchedData.map((detail, index) => {
            return (
              <option key={index.toString()} value={detail.id}>
                {detail.name}
              </option>
            );
          })}
        </select>
        <button type="button" onClick={makeMonitor}>Make monitor</button>
    </div>
  )
}

export default UserMonitor
