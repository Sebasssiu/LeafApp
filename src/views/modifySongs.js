import React from 'react'
import '../styles/songCard.css'
import '../styles/inputPages.css'
import { useHistory } from 'react-router-dom'

const ModifySongs = () => {
  const history = useHistory()
  return (
    <div className="container">
      <img src="/bitfinex-leaf.svg" alt="logo" className="logo" />
      <button onClick={() => history.push({
        pathname: '/modifySongs/modify',
         state: {
           option: 'user/artists/'
         },  
        })}
      >
        Modify Artists
      </button>
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
           option: 'songs/'
         },  
        })}
      >
        Modify Songs
      </button>
    </div>
  )
}
export default ModifySongs