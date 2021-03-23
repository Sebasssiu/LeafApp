import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import useApi from '../customHooks/useApi'
import '../styles/dataReport.css'

const DataReportItem = () => {
  const location = useLocation()
  const { numberQuery, query, linkApi } = location.state
  const history = useHistory()
  const data = useApi({
    link: linkApi,
    method: 'GET'
  })

  console.log(data, numberQuery)
  

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
              <h2>{artist.name}</h2>
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
          <h2>En los ultimos 6 meses se han suscrito {data.fetchedData} personas</h2>          
        </div>
      </div>
    )
  }
  if (numberQuery === '4') {
    return (
      <div className='container' >
        <h1>{query}</h1>
        <div className='dataobtenida'>
          <h2>ersonas</h2>          
        </div>
      </div>
    )
  }
  if (numberQuery === '5') {
    return (
      <div className='container' >
        <h1>{query}</h1>
        <div className='dataobtenida'>
          <h2>sonas</h2>          
        </div>
      </div>
    )
  }
  if (numberQuery === '6') {
    return (
      <div className='container' >
        <h1>{query}</h1>
        <div className='dataobtenida'>
          <h2> personas</h2>          
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