import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../App'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import useApi from '../customHooks/useApi';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import "../styles/search.css";
import { green } from '@material-ui/core/colors';
import PlayCircleFilledWhiteTwoToneIcon from '@material-ui/icons/PlayCircleFilledWhiteTwoTone';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { SettingsBackupRestoreSharp, SettingsPowerRounded } from '@material-ui/icons';


const Search = () => {
    const history = useHistory()
    const [search, setSearch] = useState({artist:'Reik', song:'Si me dices que si', link:'https://www.youtube.com/embed/ieodxKMYRf8'})
    const [songUser, setSongUser] = useState('piano')
    const [generos, setGeneros] = useState([{ name: 'pop', songs:[{ name:'si me dices que si', link:'https://www.youtube.com/embed/ieodxKMYRf8'}]} ])
    const [song, setSong] = useState('')
    const [atras, setAtras] = useState(false)
    const [currentSong, setCurrentSong] = useState('')
    const token = useContext(UserContext)
    const linkSearch = 'genres/'
    let count = 0
    const datos = {artist:'Reik', song:'Si me dices que si', link:'https://www.youtube.com/embed/ieodxKMYRf8'}
    const data = useApi({
        link: linkSearch,
        method: 'GET',
        token: token
    })
    
    const songData = data.fetchedData
    console.log(songData)

    useEffect(() => {
        if (atras) history.push('/')
    }, [atras])
    
    //console.log(genero1.name)
    /*const songDataJson = songData.json()
    setSearch({ artist: songDataJson.artist, song: songDataJson.song, link: songDataJson.songLink})
    */

    let linkCancion = search.link + "?autoplay=1&mute=0"
    console.log(linkCancion)
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
        setSearch({artist: '', song: info[0].name , link: info[0].link })
        //console.log(info[0].user)
        console.log(linksearch)
        console.log(info[0].name)
        console.log(info[0].link)
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

   /* const validacion = useApi({
        link:'songs/validation/',
        method: 'POST',
        body: {
            song: currentSong,
            token:token.token            
        },
        call:currentSong
    })*/
    const changeSong = (song) => {
        setCurrentSong(song.id)
        setSearch({artist: '', song: song.name , link: song.link })
        /*
        if(validacion.fetchedData.error){
            alert('Has superado el limite de canciones, ¡vuelvete premium para escuchar musica sin limites!')

        }else{
            setSearch({artist: '', song: song.name , link: song.link })
        }*/
    }

    if(data.isLoading )
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
                        console.log('atras')
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
                            console.log(genero.name)
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
                                                //console.log(song)
                                                return (
                                                    <ListItem className='SongLabel' >
                                                        <ListItemText primary={song.name} />{/*cancion que jala de la base*/}
                                                        <ListItemIcon onClick={() => {
                                                            console.log('click')
                                                            console.log(song)
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
                    <iframe width="600" height="300" src={linkCancion} 
                    frameBorder="10" ></iframe>
                </div>
            </div>
        )
    }
}
export default Search