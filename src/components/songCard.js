import React from 'react'
import '../styles/songCard.css'
import { useHistory } from 'react-router-dom'

const SongCard = ({ album }) => {
    const history = useHistory()
    return (
        <div className="card">
            <h5 className="h1">{album.name}</h5>
            <ul>
                {album.almbum_songs.map(song => {
                    return(
                        <li className="h1" onClick={() => history.push({pathname: '/modifySongs/modify', state: {album, song}})}>
                            {`${song.name}      >`}
                        </li>    
                    )            
                })}
            </ul>
        </div>
    )
}
export default SongCard