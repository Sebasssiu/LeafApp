import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../App'
import swal from 'sweetalert' 

const SimulationListen = () => {
  const history = useHistory()
  const context = useContext(UserContext)
  const [numberL, setNumberL] = useState(0)
  const [datem, setDate] = useState()
  const [data, setData] = useState({fetchedData: {}, isLoading: true})

  const onChange = (e) => {
    setNumberL(e.target.value)
  }

  const onChangeDate = (e) => {
    setDate(e.target.value)
  }

  const listenSimulation = () => {
    const body = {
      range: numberL,
      modified_id: context.user_id,
      date: datem
    }
    fetch(`https://leaf-musicapp.herokuapp.com/listen/simulatinglistens/`,{
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(response => setData({fetchedData: response, isLoading: false}))
        .catch(error => setData({...data, error: error}))
        history.push('/profile')
        swal({
          icon: 'success',
          text: `Se ha simulado escuchar ${numberL} canciones en la base de datos`,
          timer: 3000,
        })
  }

  return (
    <div className="container">
      <h1>Simulate listening of a song</h1>
      <input type="number" onChange={onChange} placeholder="No. Listens" />
      <input type="date" onChange={onChangeDate} value={datem} />
      <button type="button" onClick={listenSimulation}>Simulate</button>
    </div>
  )

}

export default SimulationListen
