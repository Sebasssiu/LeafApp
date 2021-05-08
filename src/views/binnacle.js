import React from 'react';
import useApi from '../customHooks/useApi';

const Binnacle = () => {
  const data = useApi({
    link: 'history/',
    method: 'GET'
  })

  if (data.isLoading){
    return (
      <div className="container">
          <div className="loading"/>
      </div>
    )
  }
  return (
    <div className="container">
      <h1>Binnacle</h1>
      {data.fetchedData.map((item) => {
        return (
          <h3>User id:{item.users} realizo {item.action} en la tabla {item.modified} en la fecha {item.date} y hora {item.time} </h3>
        )
      })}
    </div>
  )
}

export default Binnacle
