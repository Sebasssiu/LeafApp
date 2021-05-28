import React, { useState, useContext } from 'react'
import { UserContext } from '../App'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'

const SimultaionSong = () => {
  const history = useHistory()
  const context = useContext(UserContext)
  const [numberS, setNumberS] = useState(0)
  const [data, setData] = useState({fetchedData: {}, isLoading: true})

  const onChange = (e) => {
    setNumberS(e.target.value)
  }

  const createSimulation = () => {
    const body = {
      range: numberS,
      modified_id: context.user_id
    }
    fetch(`https://leaf-musicapp.herokuapp.com/albums/simulatingsongs/`,{
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
          text: `Se han creado ${numberS} nuevas canciones`,
          timer: 3000,
        })
  }

  return (
    <div className="container">
      <h1>Simulate the Creation of a song</h1>
      <input type="number" onChange={onChange} placeholder="No. Songs" />
      <button type="button" onClick={createSimulation}>Simulate</button>
    </div>
  )
}

export default SimultaionSong
