import React from 'react'
import { useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import useApi from '../customHooks/useApi'
import '../styles/inputPages.css'
import '../styles/songCard.css'

const ModifyDetails = () => {
  const location = useLocation()
  const { option } = location.state
  const history = useHistory()
  const data = useApi({
    link: option,
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
                  pathname: '/modifySongs/modify/item',
                  state: item,
                  })
              }}>
                {`${item.name ? item.name : item.artist_name}      >`}
              </li>    
            )            
        })}
      </ul>
    </div>
  )
}
export default ModifyDetails