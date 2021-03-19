import React from 'react'
import useApi from '../customHooks/useApi'
import SongCard from '../components/songCard'
import '../styles/songCard.css'

const ModifySongs = () => {
    const data = useApi({
        link: 'albums/',
        method: 'GET'
    })
    
    if (data.isLoading) {
        return (
            <div className="container">
                <div className="loading"/>
            </div>
        )
    } else {
        return (
            <div className="container">
                {data.fetchedData.map(album => {
                    return (
                        <>
                            <SongCard album={album} />
                        </>
                    )
                })}
            </div>
        )
    }
}
export default ModifySongs