import React from 'react'
import { useHistory } from 'react-router-dom'
import '../styles/songCard.css'
import '../styles/inputPages.css'

const MonitorOption1 = () => {
  const history = useHistory()
  
  return (
    <div className="container">
      <img src="/bitfinex-leaf.svg" alt="logo" className="logo" />
      <button onClick={() => history.push({
        pathname: '/modifySongs/modify',
         state: {
           option: 'albums/'
         },  
        })}
      >
        Modify Albums
      </button>
      <button onClick={() => history.push({
        pathname: '/modifySongs/modify',
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

export default MonitorOption1
