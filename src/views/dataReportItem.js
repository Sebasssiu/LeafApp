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

  console.log(data)
  

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
              <h2>{artist.name} </h2>
            )
          })} 
        </div>
      </div>
    )
  }
  return (
    <h2>vacio</h2>
  )
}

export default DataReportItem;