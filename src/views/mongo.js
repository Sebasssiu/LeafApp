import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'

const Mongo = () => {
  const history = useHistory()
  const [date, setDate] = useState('2021-05-24')
  const [data, setData] = useState({fetchedData: {}, isLoading: true})

  const onChange = (e) => {
    setDate(e.target.value)
  }

  const mongoI = () => {
    const body = {
      date
    }
    fetch(`https://leaf-musicapp.herokuapp.com/listen/user_listens/`,{
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
          text: `Se han agregado los datos de la fecha ${date} a la base en mongo.`,
          timer: 3000,
        })
  }
  return ( 
    <div className="container">
      <input type="date" onChange={onChange} value={date}/>
      <button type="button" onClick={mongoI}>Send Mongo</button>
    </div>
  )
}

export default Mongo
