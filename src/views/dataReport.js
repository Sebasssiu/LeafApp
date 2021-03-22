import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import { useHistory } from "react-router-dom";
import useApi from "../customHooks/useApi";
import '../styles/dataReport.css';

const ReportData = () => {
  const albumesUltimaSemana = useApi({
    link:'recentalbums/'
  })
  const history = useHistory()


  return (
    <div className='container'>
      <h1>Reporte de los datos mas importantes:</h1>
      <ol>
        <li className='queriesTitle' onClick={() => history.push({
          pathname: '/dataReport/reportItem',
          state: {
            numberQuery: '1',
            query: "Álbumes más recientes de la última semana:",
            linkApi: 'albums/recentalbums/'
          },
        })}
        >
          Álbumes más recientes de la última semana  ={">"}
        </li>
        <li className='queriesTitle' onClick={() => history.push({
          pathname: '/dataReport/reportItem',
          state: {
            numberQuery: '2',
            query: 'Artistas con popularidad creciente en los últimos tres meses:',
            linkApi: 'albums/recentalbums/' //cambiarlo cuando este el nuevo
          }
        })}
        >
          Artistas con popularidad creciente en los últimostres meses ={">"}
        </li>
        <li className='queriesTitle' onClick={() => history.push({
          pathname: '/dataReport/reportItem',
          state: {
            numberQuery: '3',
            query: 'Cantidad de nuevas suscripciones mensuales durantelos últimos seis meses:',
            linkApi: 'albums/recentalbums/' //cambiarlo cuando este el nuevo
          }
        })}
        >
          Cantidad de nuevas suscripciones mensuales durantelos últimos seis meses ={">"}
        </li>
        <li className='queriesTitle' onClick={() => history.push({
          pathname: '/dataReport/reportItem',
          state: {
            numberQuery: '4',
            query: 'Artistas con mayor producción musical:',
            linkApi: 'albums/recentalbums/' //cambiarlo cuando este el nuevo
          }
        })}
        >
          Artistas con mayor producción musical ={">"}
        </li>
        <li className='queriesTitle' onClick={() => history.push({
          pathname: '/dataReport/reportItem',
          state: {
            numberQuery: '5',
            query: 'Generos mas populares:',
            linkApi: 'albums/recentalbums/' //cambiarlo cuando este el nuevo
          }
        })}
        >
          Géneros más populares ={">"}
        </li>
        <li className='queriesTitle' onClick={() => history.push({
          pathname: '/dataReport/reportItem',
          state: {
            numberQuery: '6',
            query: 'Usuarios mas activos en la plataforma:',
            linkApi: 'albums/recentalbums/' //cambiarlo cuando este el nuevo
          }
        })}
        >
          Usuarios más activos en la plataforma ={">"}
        </li>
      </ol>
    </div>
  )
};

export default ReportData;
