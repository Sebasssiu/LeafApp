import React from 'react';
import { useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import useApi from '../customHooks/useApi'
import '../styles/inputPages.css'
import '../styles/songCard.css'

const MonitorOption3 = () => {
  const location = useLocation()
  const history = useHistory()
  const data = useApi({
    link: 'user/modify_is_not_premium/',
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
                  pathname: '/monitorOption3/Item',
                  state: item,
                  })
              }}>
                {`${item.name ? item.name : item.username}      >`}
              </li>    
            )            
        })}
      </ul>
    </div>
  )
}

export default MonitorOption3
