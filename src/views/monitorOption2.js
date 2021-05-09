import React from 'react'
import useApi from '../customHooks/useApi'
import { UserContext } from '../App'
import { useHistory } from 'react-router-dom'
import '../styles/monitorOption2.css'

const MonitorOption2 = () => {
  const history = useHistory()
  
  return (
    <div className="container">
      <img src="/bitfinex-leaf.svg" alt="logo" className="logo" />
      <button onClick={() => history.push({
        pathname: '/monitorOption2/list',
         state: {
           option: 'albums/'
         },  
        })}
      >
        Modify Albums
      </button>
      <button onClick={() => history.push({
        pathname: '/monitorOption2/list',
         state: {
           option: 'allSongs/'
         },  
        })}
      >
        Modify Songs
      </button>
    </div>
  )
}

export default MonitorOption2
