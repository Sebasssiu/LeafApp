import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import useApi from '../customHooks/useApi'
import '../styles/dataReport.css'

const DataReportItem = () => {
  const location = useLocation()
  const { numberQuery, query, linkApi, linkApiPost } = location.state
  const [dataDates, setDataDates] = useState({fetchedData: {}, isLoading: true})
  const [dates, setDates] = useState({
    date1: '2021-03-01',
    date2: '2021-05-01',
    limit: 1,
    name: 'avicii'
  })
  const data = useApi({
    link: linkApi,
    method: 'GET'
  })
  const prueba = useApi({
    link:'listen/weeklyListen/',
    method: 'POST',
    body: {
      date1: dates.date1,
      date2: dates.date2
    }
  })
  console.log(prueba)
  const QueryDates = () => {
    const body = {
      date1: dates.date1,
      date2: dates.date2
    }
    fetch(`https://leaf-musicapp.herokuapp.com/${linkApiPost}`,{
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body) 
        })
        .then(response => response.json())
        .then(response => setDataDates({fetchedData: response, isLoading: false}))
        .catch(error => setDataDates({...dataDates, error: error}))
  }
  const QueryDatesLimit = () => {
    const body = {
      date1: dates.date1,
      date2: dates.date2,
      limit: dates.limit
    }
    fetch(`https://leaf-musicapp.herokuapp.com/${linkApiPost}`,{
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body) 
        })
        .then(response => response.json())
        .then(response => setDataDates({fetchedData: response, isLoading: false}))
        .catch(error => setDataDates({...dataDates, error: error}))
  }
  const QueryName = () => {
    const body = {
      name: dates.name
    }
    fetch(`https://leaf-musicapp.herokuapp.com/${linkApiPost}`,{
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body) 
        })
        .then(response => response.json())
        .then(response => setDataDates({fetchedData: response, isLoading: false}))
        .catch(error => setDataDates({...dataDates, error: error}))
  }

  const onChange = (e) => {
    setDates({...dates, [e.target.name]: e.target.value})
  }

  if (data.isLoading){
    return (
      <div className="container">
          <div className="loading"/>
      </div>
    )
  }
  if (numberQuery === '1') {
    return (
      <div className='container' >
        <h1>{query}</h1>
        <div className='dataobtenida'>
          {data.fetchedData.map(album => {
            return (
              <h2>{album.name} con estreno: {album.release_date}</h2>
            )
          })} 
        </div>
      </div>
    )
  }
  if (numberQuery === '2') {
    return (
      <div className='container' >
        <h1>{query}</h1>
        <div className='dataobtenida'>
          {data.fetchedData.map(artist => {
            return (
              <h2>{artist[0]} con reproducciones de todas las canciones de: {artist[1]}</h2>
            )
          })} 
        </div>
      </div>
    )
  }
  if (numberQuery === '3') {
    return (
      <div className='container' >
        <h1>{query}</h1>
        <div className='dataobtenida'>
          {data.fetchedData.map(mes => {
            return (
              <h2 key={mes[0]}>En el mes numero {mes[0]} se suscribieron {mes[1]} personas</h2>
            )
          })}          
        </div>
      </div>
    )
  }
  if (numberQuery === '4') {
    return (
      <div className='container' >
        <h1>{query}</h1>
        <div className='dataobtenida'>
          {data.fetchedData.map(artist => {
            return (
              <h2>El artista: "{artist.user}" con un total de canciones: {artist.total}</h2>
            )
          })}          
        </div>
      </div>
    )
  }
  if (numberQuery === '5') {
    return (
      <div className='container' >
        <h1>{query}</h1>
        <div className='dataobtenida'>
          {data.fetchedData.map((genero, index) => {
            return (
              <h2 key={index}>Genero musical: {genero[0]} con un total de reproducciones de: {genero[1]}</h2> 
            )
          })}         
        </div>
      </div>
    )
  }
  if (numberQuery === '6') {
    return (
      <div className='container' >
        <h1>{query}</h1>
        <div className='dataobtenida'>
          {data.fetchedData.map(usuario => {
            return (
              <h2>{usuario.user} con un total de reproducciones de: {usuario.total}</h2> 
            )
          })}         
        </div>
      </div>
    )
  }
  if (numberQuery === '7') {
    return (
      <div className='container' >
        <h1>{query}</h1>
        <h3>Ingrese la fecha en formato: YYYY-MM-DD</h3>
        <div className='datesContainer'>
          <input 
            type="date"
            name="date1"
            value="2021-03-01"
            onChange={onChange}
          />
          <input 
            type="date"
            name="date2"
            value="2021-05-01"
            onChange={onChange}
          />
          <button onClick={QueryDates}>Search</button>
        </div>
        {!dataDates.isLoading ? (
          <div className='dataobtenida'>
            {console.log(dataDates.fetchedData)}
            {Object.keys(dataDates.fetchedData).map((keyname, item) => {
              return (
                <h3>{keyname} con un total de: {item}</h3>
              )
            })}         
          </div>
        ) : null}
      </div>
    )
  }
  if (numberQuery === '8') {
    return (
      <div className="container">
        <h1>{query}</h1>
        <div className='datesContainer'>
          <input 
            type="date"
            name="date1"
            value="2021-03-01"
            onChange={onChange}
          />
          <input 
            type="date"
            name="date2"
            value="2021-05-01"
            onChange={onChange}
          />
          <input
            type="number"
            min="1"
            name="limit"
            onChange={onChange}
          />
          <button onClick={QueryDatesLimit}>Search</button>
        </div>
        {!dataDates.isLoading ? (
          <div className="dataobtenida">
            {console.log(dataDates.fetchedData)}
            {Object.keys(dataDates.fetchedData).map((keyname, item) => {
              return (
                <h3>{keyname} con un total de reproducciones: {dataDates.fetchedData[keyname]}</h3>
              )
            })}
          </div>
        ) : null}
      </div>
    )
  }
  if (numberQuery === '9') {
    return (
      <div className="container">
        <h1>{query}</h1>
        <div className="datacontainer">
          <input 
            type="date"
            name="date1"
            value="2021-03-01"
            onChange={onChange}
          />
          <input 
            type="date"
            name="date2"
            value="2021-05-01"
            onChange={onChange}
          />
          <button onClick={QueryDates}>Search</button>
        </div>
        {!dataDates.isLoading ? (
          <div className='dataobtenida'>
            {console.log(dataDates.fetchedData)}
            {Object.keys(dataDates.fetchedData).map((keyname, item) => {
              return (
                <h3>{keyname} con un total de: {dataDates.fetchedData[keyname]}</h3>
              )
            })}         
          </div>
        ) : null}
      </div>
    )
  }
  if (numberQuery === '10') {
    return (
      <div className="container">
        <h1>{query}</h1>
        <div className="datacontainer">
          <input
            type="text"
            name="name"
            onChange={onChange}
          />
          <button onClick={QueryName}>Search</button>
        </div>
        {!dataDates.isLoading ? (
          <div className="dataobtenida">
            {console.log(dataDates.fetchedData)}
            {Object.keys(dataDates.fetchedData).map((key => {
              return (
                <h3>{key} con un total de reproducciones: {dataDates.fetchedData[key]}</h3>
              )
            }))}
          </div>
        ): null}
      </div>
    )
  }
  return (
    <div className='container' >
      <h1>Lamentablemente ocurrio un error con el dato que buscas, se hara la consulta para el siguiente reporte</h1>
    </div>
  )
}

export default DataReportItem;