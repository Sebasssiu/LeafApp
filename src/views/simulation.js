import React from 'react'
import { useHistory } from 'react-router-dom'

const Simulacion =() => {
  const history = useHistory()
  
  return (
    <div className="container">
      <img src="/bitfinex-leaf.svg" alt="logo" className="logo" />
      <button onClick={() => history.push('/simulationSong')}>Simulation Create Song</button>
      <button onClick={() => history.push('/simulationListen')}>Simulation Listen</button>
    </div>
  )
}

export default Simulacion
