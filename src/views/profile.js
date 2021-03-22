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
          <button onClick={ () => history.push('/dataReport')}>Data Report</button>
        ) : null}
      </div>
    )
  }
}
export default Profile