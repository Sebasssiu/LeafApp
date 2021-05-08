import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import useApi from '../customHooks/useApi'
import '../styles/inputPages.css'
import '../styles/songCard.css'

const MonitorOption4 = () => {
  const location = useLocation()
  const history = useHistory()
  const data = useApi({
    link: 'user/deactivate_premium/',
    method: 'GET'
  })

  if (data.isLoading) {
    return (
      <div className="container">
        <div className="loading"/>
      </div>
    )
  }
  return(
    <div className="container">
      <ul>
        {data.fetchedData.map(item => {
            return(
              <li id={item.id} className="h1" onClick={() => {
                history.push({
                  pathname: '/monitorOption4/item',
                  state: item,
                  })
              }}>
                {`${item.username ? item.username : item.artist_name}      >`}
              </li>    
            )            
        })}
      </ul>
    </div>
  )
}

export default MonitorOption4
