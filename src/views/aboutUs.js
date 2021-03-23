import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import '../styles/aboutUs.css'

const AboutUs = () => {
  return (
    <div className='container' >
      <h1 className='title'>Meet the Leaf Music team</h1>
      <div className='container2'>
        <h2>Donaldo Sebastian Garcia J.</h2>
        <div>
          <h3>Carnet: 19683</h3>
          <a rel="Github" href='https://github.com/Sebasssiu' target='_blank' >Github: Sebasssiu</a>
        </div>
        <h2>Raul Angel Jimenez H.</h2>
        <div>
          <h3>Carnet: 19017</h3>
          <a rel="Github" href='https://github.com/Raulangel51' target='_blank' >Github: Raulangel51</a>
        </div>
        <h2>Oscar Rene Saravia D.</h2>
        <div>
          <h3>Carnet: 19322</h3>
          <a rel="Github" href='https://github.com/oscarsaravia' target='_blank' >Github: oscarsaravia</a>
        </div>
      </div>
    </div>
  )
}

export default AboutUs