import React, { useContext, useState, useEffect } from 'react'
import '../styles/inputPages.css'
import { UserContext } from '../App'
import useApi from '../customHooks/useApi'
import PersonIcon from '@material-ui/icons/Person';
import { green } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom'

const Profile = () => {
  const history = useHistory()
  const [link, setLink] = useState()
  const token = useContext(UserContext)
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
    link: link,
    method: 'POST',
    body: {
      token: token.token
    }
  })
  useEffect(() => {
    if (becomeArtist.fetchedData.response) { 
      alert('Ahora eres un artista!')
      setNowArtist(true)
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
            checked = {isArtist ? isArtist : false}
            onChange = {() => setIsArtist(isArtist ? false : true)}
          />
        </div>
        {data.fetchedData.isArtist !== isArtist ? (
          <button onClick={ () => setLink('user/becomeArtist/')}>Save changes</button>
        ) : null}
        {data.fetchedData.isArtist || nowArtist ? (
          <button onClick={ () => history.push('/createPlaylist')}>Create playlist</button>
        ) : null}
        {data.fetchedData.isAdmin ? (
          <button onClick={ () => history.push('/modifySongs')}>Modify songs</button>
        ) : null}
      </div>
    )
  }
}
export default Profile