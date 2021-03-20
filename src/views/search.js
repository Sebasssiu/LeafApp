import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../App'
import { useHistory } from 'react-router-dom'
import useApi from '../customHooks/useApi';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import "../styles/search.css";
import { green } from '@material-ui/core/colors';
import PlayCircleFilledWhiteTwoToneIcon from '@material-ui/icons/PlayCircleFilledWhiteTwoTone';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const Search = () => {
    const history = useHistory()
    const [search, setSearch] = useState({artist:'Reik', song:'Si me dices que si', link:'https://www.youtube.com/embed/ieodxKMYRf8'})
    const [songUser, setSongUser] = useState('piano')
    const [atras, setAtras] = useState(false)
    const [currentSong, setCurrentSong] = useState('')
    const token = useContext(UserContext)
    const linkSearch = 'genres/'

    const data = useApi({
        link: linkSearch,
        method: 'GET',
        token: token
    })
    
    useEffect(() => {
        if (atras) history.push('/')
    }, [atras])

    let linkCancion = search.link + "?autoplay=1&mute=0"
    const [open, setOpen] = React.useState(true);

    const styleHeaderList = {
        color: 'rgb(6, 182, 6)',
        fontSize: '0.875rem',
        boxSizing: 'border-box',
        listStyle: 'none',
        fontFamily: "Roboto",
        fontWeight: '500',
        lineHeight: '48px'
    }

    const handleClick = () => {
        setOpen(!open)
    }

    const searchfunction = () => {
        setCurrentSong(info[0])
    }

    const linksearch = 'songs/?search='+songUser
    const info = useApi({
        link:linksearch,
        method: 'GET' ,
        token:token
    }).fetchedData

    const changeInput = (e) => {
        setSongUser(e.target.value)
    }

    const validacion = useApi({
        link:'songs/validation/',
        method: 'POST',
        body: {
            song: currentSong.id,
            token:token.token            
        },
        call:currentSong
    })
    
    useEffect( () => {
        console.log(validacion.fetchedData)
        if(validacion.fetchedData)
        {
            if(validacion.fetchedData.error){
                alert('Has superado el limite de canciones, ¡Vuelvete premium para escuchar musica sin limites!')
            }else if(validacion.fetchedData.alert){
                setSearch({artist: '', song: currentSong.name , link: currentSong.link })
            }
            else{
                setSearch({artist: 'Reik', song: 'Si me dices que si' , link: 'https://www.youtube.com/embed/ieodxKMYRf8' })
            }
        }
    }, [validacion])
    const changeSong = (song) => {
        setCurrentSong(song)
    }

    if(data.isLoading)
    {
        return (
            <div>
                <h1>is loading</h1>
            </div>
        )
    } else{

        return (
            <div className='background'>
                <div className='lefSideMenu'>
                    <button className='backButton' onClick={() => {
                        setAtras(true)
                    } }>
                    <ArrowBackIcon style={{ color: green[500], fontSize: 30}}/>
                    </button>
                    <input className='searchBar' placeholder="Search song" onChange={changeInput}></input>
                    <button className='searchSongButton' onClick={searchfunction}>Search</button>
                    <List 
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                        <ListSubheader style={styleHeaderList} component="div" id="nested-list-subheader" className='listHeader' >
                            Generos
                        </ListSubheader>
                        }
                        className='listaGeneros'
                    >
                        {data.fetchedData.map( (genero) => {
                            return (
                                <>
                                <ListItem button onClick={handleClick} id={genero.id}>
                                    <ListItemText primary={genero.name} />
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {
                                            genero.songs.map( (song) => {
                                                return (
                                                    <ListItem className='SongLabel' >
                                                        <ListItemText primary={song.name} />{/*cancion que jala de la base*/}
                                                        <ListItemIcon onClick={() => {
                                                            changeSong(song)
                                                        }}>
                                                            <PlayCircleFilledWhiteTwoToneIcon style={{ color: green[500], fontSize: 30}}/>
                                                        </ListItemIcon>
                                                    </ListItem>
                                                )
                                            } )
                                        }
                                    </List>
                                </Collapse>                             
                            </>
                            )
                        } )
                        }
                        
                    </List>
                </div>
                <div className='rightSideSearchData'>
                    <h3>{search.artist}</h3>
                    <h2>{search.song}</h2>
                    <iframe
                      title="Songs"
                      width="600"
                      height="300"
                      src={linkCancion}
                      frameBorder="10" 
                    />
                </div>
            </div>
        )
    }
}
export default Search