import React from 'react'
import { useLocation } from 'react-router-dom'
import useApi from '../customHooks/useApi'
import '../styles/dataReport.css'

const DataReportItem = () => {
  const location = useLocation()
  const { numberQuery, query, linkApi } = location.state
  const data = useApi({
    link: linkApi,
    method: 'GET'
  })

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
  return (
    <div className='container' >
      <h1>Lamentablemente ocurrio un error con el dato que buscas, se hara la consulta para el siguiente reporte</h1>
    </div>
  )
}

export default DataReportItem;