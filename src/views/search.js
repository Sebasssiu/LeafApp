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
import useApi from '../customHooks/useApi'
import "../styles/login.css";


const Search = () => {
    const [search, setSearch] = useState({ artist: '', song: '', link:'' })
    const token = useContext(UserContext)
    const linkSearch = 'search'
    const songData = useApi({
        link: linkSearch,
        method: 'GET',
        token: token,
        call: search
    })
    const songDataJson = songData.json()
    setSearch({ artist: songDataJson.artist, song: songDataJson.song, link: songDataJson.songLink})


    return (
        <div className='background'>
            <div className='leftSideMenu'>
                <div className='artistData'>
                </div>
                <div className='songsData'>
                </div>
            </div>
            <div className='rightSideSearchData'>
                <h1>{search.song}</h1>
                <h2>{search.artist}</h2>
                <iframe width="560" height="315" src={search.link} frameborder="0" 
                allow="autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    )
}