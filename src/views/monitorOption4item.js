import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom"
import useApi from '../customHooks/useApi'
import { useHistory } from 'react-router-dom'
import '../styles/inputPages.css'
import '../styles/songCard.css'
import EditIcon from '@material-ui/icons/Edit';
import { green } from '@material-ui/core/colors';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

const MonitorOption4Item = () => {
  const location = useLocation()
  const [link, setLink] = useState('user/deactivate_premium/')
  const item = location.state
  const [data, setData] = useState({
    name: item.name ? item.name : item.artist_name,
    link: item.link ? item.link : '',
    isStaff: typeof(item.is_staff) !== 'undefined' ? item.is_staff : false,
    delete: false,
    isModify: false,
  })
  const history = useHistory()
  const updateData = useApi({
    link,
    method: 'POST',
    body: {
      data,
      item,
    },
  })
  const linkVerify = () => {
    const body = {
      item,
      data,
    }
    console.log(body)
    fetch(`https://leaf-musicapp.herokuapp.com/user/deactivate_premium/`,{
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
    if (updateData.fetchedData.response) history.push('/profile')
  }
  return (
    <div className="container">
      {Object.keys(item).map((variant) => {
        if (variant === 'name' || variant === 'artist_name') {
          return (
            <div className="row">
              <h3 className="column">{variant}</h3>
              <input
                className="column"
                type="text"
                readOnly
                value = {data.name}
                placeholder={item[variant]}
              />
              <div className="column">
                <NotInterestedIcon style={{ color: green[500], fontSize: 30}}/>
              </div>
            </div>
          )
        }
        if (variant === 'is_staff') {
          return (
            <div className="row">
              <h3 className="column">{variant}</h3>
              <input 
                className="column"
                type="checkbox"
                checked = {data.isStaff}
                onChange = {() => setData({
                  ...data,
                  isStaff: data.isStaff ? false : true,
                  isModify: true,
                })}
              />
              <div className="column">
                <EditIcon style={{ color: green[500], fontSize: 30}}/>
              </div>
            </div>
          )
        }
        if (variant === 'link') {
          return (
            <div className="row">
              <h3 className="column">{variant}</h3>
              <input
                className="column"
                type="text"
                value = {data.link}
                placeholder={item[variant]}
              />
              <div className="column">
                <NotInterestedIcon style={{ color: green[500], fontSize: 30}}/>
              </div>
            </div>
          )
        }
        return (
          <div className="row">
            <h3 className="column">{variant}</h3>
            <input
              className="column"
              readOnly
              type="text"
              value = {item[variant]}
              placeholder={item[variant]}
            />
            <div className="column">
              <NotInterestedIcon style={{ color: green[500], fontSize: 30}}/>
            </div>
          </div>
        )
      })}
      {data.isModify ? (
        <button onClick={linkVerify}>Save changes</button>
      ) : null}
    </div>
  )
}

export default MonitorOption4Item
