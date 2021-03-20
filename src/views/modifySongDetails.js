import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import '../styles/inputPages.css'
import useApi from '../customHooks/useApi'
import { useHistory } from 'react-router-dom'

const ModifyDetails = () => {
  const history = useHistory()
  const location = useLocation()
  const { album, song } = location.state
  const [link, setLink] = useState('')
  const artisName = useApi({
    link: 'user/artistid/',
    method: 'POST',
    body: {
      id: song.user
    },
  })
  const [data, setData] = useState({
    id: album.id,
    song_id: song.id,
    artist_id: song.user,
    album: album.name,
    song: song.name,
    artist: artisName.fetchedData.name,
    isSong: song.is_active,
    isModify: false,
    delete: false,
  })
  useEffect(() => {
    setData({
      ...data,
      artist: artisName.fetchedData.name,
    })
  }, [artisName])
  //CAMBIAR NOMBRE ALBUM, NOMBRE CANCIÓN, NOMBRE ARTISTA, CANCION IS ACTIVE ? O ELIMINAR
  const sendData = useApi({
    link,
    method: 'POST',
    body: data,
  })
  useEffect(() => {
    if (sendData.fetchedData.response) history.push('/modifySongs')
  }, [sendData])

  if (artisName.isLoading) {
    return (
      <div className="container">
        <div className="loading"/>
      </div>
    )
  }
  return (
    <div className="container">
      <div>
        <input
          type="text"
          value = {data.album}
          placeholder="Almbum Name"
          onChange = {e => setData({
            ...data,
            album: e.target.value,
            isModify: true,
          })}
        />
      </div>
      <div>
        <input
          type="text"
          value = {data.song}
          placeholder="Song Name"
          onChange = {e => setData({
            ...data,
            song: e.target.value,
            isModify: true,
          })}
        />
      </div>
      <div>
        <input
          type="text"
          value = {data.artist}
          placeholder="Artist Name"
          onChange = {e => setData({
            ...data,
            artist: e.target.value,
            isModify: true,
          })}
        />
      </div>
      <div className="check">
        <h3 className="h3">Is active</h3>
        <input 
          type="checkbox"
          checked = {data.isSong}
          onChange = {() => setData({
            ...data,
            isSong: data.isSong ? false : true,
            isModify: true,
          })}
        />
      </div>
      {data.isModify ? (
          <button onClick={() => setLink('albums/updatealbum/')}>Save Changes</button>
        ) : null}
      <button onClick={() => {
          setData({
            ...data,
            delete: true,
          }) 
          setLink('albums/updatealbum/')
        }}
      >
        Delete Song</button>
    </div>
  )
}
export default ModifyDetails
