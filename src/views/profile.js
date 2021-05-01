import React, { useContext, useState, useEffect } from 'react'
import '../styles/inputPages.css'
import { UserContext } from '../App'
import useApi from '../customHooks/useApi'
import PersonIcon from '@material-ui/icons/Person';
import { green } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom'
import FaceIcon from '@material-ui/icons/Face';

const Profile = () => {
  const history = useHistory()
  const token = useContext(UserContext)
  const [link, setLink] = useState()
  const [senData, setSenData] = useState({
    token: token.token,
    artist_name: '',
  })
  const data = useApi({
    link: 'user/userData/',
    method: 'POST',
    body: {
      token: token.token
    }
  })
  const [isArtist, setIsArtist] = useState(data.fetchedData.isArtist)
  const [nowArtist, setNowArtist] = useState(false)
  const becomeArtist = useApi({
    link,
    method: 'POST',
    body: senData,
  })
  const userMonitorData = useApi({
    link: 'user/getMonitor/',
    method: 'POST',
    body:{
      token: token.token,
    }
  })
  console.log(userMonitorData)
  useEffect(() => {
    if (becomeArtist.fetchedData.response) { 
      alert('Ahora eres un artista!')
      setNowArtist(true)
      history.push('/')
    }
    if (data.fetchedData.length !== 0) setIsArtist(data.fetchedData.isArtist)
  }, [becomeArtist, data])
  if (data.isLoading) {
    return (
      <div className="container">
          <div className="loading"/>
      </div>
    )
  } else {
    return (
      <div className="container">
        <div className="userPhoto"/>
        {console.log(data.fetchedData)}
        <div>
          <PersonIcon style={{ color: green[500], fontSize: 30}}/>
          <input 
            type="text"
            value = {data.fetchedData.username}
            readonly
          />
        </div>
        {isArtist && !data.fetchedData.isArtist ? (
          <div>
            <FaceIcon style={{ color: green[500], fontSize: 30}}/>
            <input 
              type="text"
              value = {senData.artist_name}
              placeholder="Artist Name"
              onChange = {(e) => setSenData({
                ...senData,
                artist_name: e.target.value,
              })}
            />
          </div>
        ) : null}
        <div className="check">
          <h3 className="h3">Is Premium</h3>
          <input 
            readOnly
            type="checkbox"
            checked = {data.fetchedData.isPremium}
          />
        </div>
        <div className="check">
          <h3 className="h3">Is Artist</h3>
          <input 
            type="checkbox"
            checked = {isArtist}
            onChange = {() => setIsArtist(isArtist ? false : true)}
          />
        </div>
        {data.fetchedData.isArtist !== isArtist ? (
          <button onClick={ () => setLink('user/becomeArtist/')}>Save changes</button>
        ) : null}
        {data.fetchedData.isPremium ? (
          <button onClick={ () => history.push('/playlists')}>Create playlist</button>
        ) : null}
        {data.fetchedData.isArtist || nowArtist ? (
          <button onClick={ () => history.push('/albums')}>Create album</button>
        ) : null}
        {data.fetchedData.isAdmin ? (
          <button onClick={ () => history.push('/modifySongs')}>Modify Data</button>
        ) : null}
        {data.fetchedData.isAdmin ? (
          <button onClick={ () => history.push('/monitorUpdate')}>Monitor profile</button>
        ) : null}
        {data.fetchedData.isAdmin ? (
          <button onClick={ () => history.push('/userMonitor')}>User monitor</button>
        ) : null}
        {data.fetchedData.isAdmin ? (
          <button onClick={ () => history.push('/dataReport')}>Data Report</button>
        ) : null}
        {userMonitorData.fetchedData.name ?(
          <div className="monitor-container">
            <h1>{userMonitorData.fetchedData.name}</h1>
          <div className="monitor-actions">
            {userMonitorData.fetchedData.task_1 ? (
              <button type="button" onClick={() => history.push('/monitorOption1')}>Modify song/album</button>
            ) : null }
            {userMonitorData.fetchedData.task_2 ? (
              <button type="button" onClick={() => history.push('/monitorOption2')}>Enable song/album</button>
            ) : null }
            {userMonitorData.fetchedData.task_3 ? (
              <button type="button" onClick={() => history.push('/monitorOption3')}>Deactivate unsuscribe users</button>
            ) : null }
            {userMonitorData.fetchedData.task_4 ? (
              <button type="button" onClick={() => history.push('/monitorOption4')}>Delete suscription</button>
            ) : null }
            {userMonitorData.fetchedData.task_5 ? (
              <button type="button" onClick={() => console.log('option5')}>Deactivate artistist users</button>
            ) : null }
            {userMonitorData.fetchedData.task_6 ? (
              <button type="button" onClick={() => history.push('/userMonitor')}>User monitor</button>
            ) : null }
            {userMonitorData.fetchedData.task_7 ? (
              <button type="button" onClick={() => history.push('/dataReport')}>Data reports</button>
            ) : null }
            {userMonitorData.fetchedData.task_7 ? (
              <button type="button" onClick={() => console.log('oprion8')}>Binnacle (Bitacora)</button>
            ) : null }
          </div>
        </div>
        ) : null }
      </div>
    )
  }
}
export default Profile