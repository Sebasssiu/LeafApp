import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from "react-router-dom"
import useApi from '../customHooks/useApi'
import { useHistory } from 'react-router-dom'
import '../styles/inputPages.css'
import '../styles/songCard.css'
import EditIcon from '@material-ui/icons/Edit';
import { green } from '@material-ui/core/colors';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import { UserContext } from '../App'

const MonitorOption2Modify = () => {
  const context = useContext(UserContext)
  const location = useLocation()
  const [link, setLink] = useState('')
  const item = location.state
  const [data, setData] = useState({
    name: item.name ? item.name : item.artist_name,
    link: item.link ? item.link : '',
    isActive: typeof(item.is_active) !== 'undefined' ? item.is_active : false,
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
      modified_id: context.user_id
    },
  })
  const linkVerify = () => {
    if (item.link) setLink('songs/modifySong/')
    if (item.username) setLink('user/modifyUser/')
    if (item.release_date)setLink('albums/modifyAlbum/')
  }
  useEffect(() => {
    if (updateData.fetchedData.response) history.push('/monitorOption2')
  }, [updateData])
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
                onChange = {e => setData({
                  ...data,
                  name: e.target.value,
                  isModify: true,
                })}
              />
              <div className="column">
                <NotInterestedIcon style={{ color: green[500], fontSize: 30}}/>
              </div>
            </div>
          )
        }
        if (variant === 'is_active') {
          return (
            <div className="row">
              <h3 className="column">{variant}</h3>
              <input 
                className="column"
                type="checkbox"
                checked = {data.isActive}
                onChange = {() => setData({
                  ...data,
                  isActive: data.isActive ? false : true,
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
                readOnly
                value = {data.link}
                placeholder={item[variant]}
                onChange = {e => setData({
                  ...data,
                  link: e.target.value,
                  isModify: true,
                })}
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

export default MonitorOption2Modify
