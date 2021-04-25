import React, { useState} from 'react'
import useApi from '../customHooks/useApi'
import { UserContext } from '../App'
import { useHistory } from 'react-router-dom'
import '../styles/monitorUpdate.css'

const MonitorUpdate = () => {
  const [user, setUser] = useState('')
  const [optinoSelection, setOptionSelection] = useState({
    option_1: false,
    option_2: false,
    option_3: false,
    option_4: false,
    option_5: false,
    option_6: false,
    option_7: false,
    option_8: false,
  })
  const userData =  useApi({
    link: 'user/',
    method: 'GET',
  })

  const onChange = (e) => {
    setOptionSelection({...optinoSelection, [e.target.name]: e.target.checked})
  }
  
  if (userData.isLoading) {
    return (
      <div className="container">
        <div className="loading"/>
        {console.log(userData)}
      </div>
    )
  }
  return (
    <div className="container">
      <h1>Make a user monitor</h1>
      {console.log(userData)}
      <div className="userSection">
        <select
          className="userListSelection"
          onChange={(e) => setUser(e.target.value)}
        >
          <option value="empty">Select a user</option>
          {userData.fetchedData.map((detail, index) => {
            return (
              <option key={index.toString()} value={detail.id}>
                {detail.username}
              </option>
            );
          })}
        </select>
      </div>
      <div className="options-box">
        <div className="check-box-container">
          <input
            type="checkbox"
            className="check-update"
            checked={optinoSelection.option_1}
            name="option_1"
            onChange={onChange} 
          />
          <input
            type="checkbox"
            className="check-update"
            checked={optinoSelection.option_2}
            name="option_2"
            onChange={onChange} 
          />
          <input
            type="checkbox"
            className="check-update"
            checked={optinoSelection.option_3}
            name="option_3"
            onChange={onChange} 
          />
          <input
            type="checkbox"
            className="check-update"
            checked={optinoSelection.option_4}
            name="option_4"
            onChange={onChange} 
          />
          <input
            type="checkbox"
            className="check-update"
            checked={optinoSelection.option_5}
            name="option_5"
            onChange={onChange} 
          />
          <input
            type="checkbox"
            className="check-update"
            checked={optinoSelection.option_6}
            name="option_6"
            onChange={onChange} 
          />
          <input
            type="checkbox"
            className="check-update"
            checked={optinoSelection.option_7}
            name="option_7"
            onChange={onChange} 
          />
          <input
            type="checkbox"
            className="check-update"
            checked={optinoSelection.option_8}
            name="option_8"
            onChange={onChange} 
          />
        </div>
        <div className="description-container">
          <div className="option-description-div"><p className="option-description">1.Modificar la información de cualquier track y álbumdel catálogo</p></div>
          <div className="option-description-div"><p className="option-description">2.Desactivar tracks y álbumes</p></div>
          <div className="option-description-div"><p className="option-description">3.Desactivar usuarios sin suscripción para que ya nopuedan acceder a la plataforma</p></div>
          <div className="option-description-div"><p className="option-description">4.Eliminar suscripciones de usuarios</p></div>
          <div className="option-description-div"><p className="option-description">5.Desactivar usuarios registrados como artistas</p></div>
          <div className="option-description-div"><p className="option-description">6.Asociar un usuario existente a un perfiles de monitoreo</p></div>
          <div className="option-description-div"><p className="option-description">7.Generar los reportes ofrecidos por la plataforma</p></div>
          <div className="option-description-div"><p className="option-description">8.Consulta de bitácora de operaciones</p></div>
        </div>
      </div>
      <div className="button-update-monitor">
        <button type="button" onClick={() => {
          console.log(user, optinoSelection)
        }}>Update</button> {/* Falta hacer el onclick para enviar la actualizacion a la base*/}
      </div>
    </div>
  )
}

export default MonitorUpdate
