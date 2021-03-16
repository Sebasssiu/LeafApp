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


const Search = () => {
    const [search, setSearch] = useState({ artist: '', song: '', link:'' })
    const token = useContext(UserContext)
    const linkSearch = 'search'
    const datos = {artist:'Reik', song:'Si me dices que si', link:'https://www.youtube.com/embed/ieodxKMYRf8'}
    /*const songData = useApi({
        link: linkSearch,
        method: 'GET',
        token: token,
        call: search
    })
    const songDataJson = songData.json()
    setSearch({ artist: songDataJson.artist, song: songDataJson.song, link: songDataJson.songLink})
    */

    let linkCancion = datos.link + "?autoplay=1&mute=0"

    return (
        <div className='background'>
            <List 
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader" className='listHeader'>
                    Otras busquedas
                  </ListSubheader>
                }
                className='leftSideMenu'
              >
            </List>
            <div className='rightSideSearchData'>
                <h3>{datos.artist}</h3>
                <h2>{datos.song}</h2>
                <iframe width="600" height="300" src={linkCancion} 
                frameBorder="0" ></iframe>
            </div>
        </div>
    )
}
export default Search