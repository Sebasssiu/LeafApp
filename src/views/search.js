import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import { useHistory } from "react-router-dom";
import useApi from "../customHooks/useApi";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import "../styles/search.css";
import { green } from "@material-ui/core/colors";
import PlayCircleFilledWhiteTwoToneIcon from "@material-ui/icons/PlayCircleFilledWhiteTwoTone";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";

const Search = () => {
  const history = useHistory();
  const [search, setSearch] = useState({
    artist: "Reik",
    song: "Si me dices que si",
    link: "https://www.youtube.com/embed/ieodxKMYRf8",
  });
  const [songUser, setSongUser] = useState("piano");
  const [atras, setAtras] = useState(false);
  const [currentSong, setCurrentSong] = useState({
    artist: "Reik",
    song: "Si me dices que si",
    link: "https://www.youtube.com/embed/ieodxKMYRf8",
  });
  const token = useContext(UserContext);
  const linkSearch = "genres/";
  let ownerid = token.token;

  const plnames = useApi({
    link: "playlists/userPlaylist/",
    method: "POST",
    body: {
      token: ownerid,
    },
  });

  const data = useApi({
    link: linkSearch,
    method: "GET",
    token: token,
  });

  const songPlayList = localStorage.getItem("name");
  if (songPlayList) {
    const linkPlayList = localStorage.getItem("link");
    search.song = songPlayList;
    search.link = linkPlayList;
  }

  useEffect(() => {
    if (atras) history.push("/");
  }, [atras]);

  let linkCancion = search.link + "?autoplay=1&mute=0";
  const [open, setOpen] = React.useState({});

  const styleHeaderList = {
    color: "rgb(6, 182, 6)",
    fontSize: "0.875rem",
    boxSizing: "border-box",
    listStyle: "none",
    fontFamily: "Roboto",
    fontWeight: "500",
    lineHeight: "48px",
  };

  const handleClick = (index) => {
    setOpen({
      ...open, [index]:!open [index] 

    });
  };

  const searchfunction = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("link");
    console.log(info[0])
    if (info[0]) setCurrentSong(info[0]);
    else alert("Lo lamento la cancion que buscas no esta en nuestros servidores.")
  };

  const linksearch = "songs/?search=" + songUser;
  const info = useApi({
    link: linksearch,
    method: "GET",
    token: token,
  }).fetchedData;

  const changeInput = (e) => {
    setSongUser(e.target.value);
  };

  console.log(currentSong)
  const validacion = useApi({
    link: "songs/validation/",
    method: "POST",
    body: {
      song: currentSong.id,
      token: token.token,
    },
    call: currentSong,
  });

  useEffect(() => {
    console.log(validacion.fetchedData)
    if (validacion.fetchedData) {
      if (validacion.fetchedData.error) {
        alert(
          "Has superado el limite de canciones, ¡Vuelvete premium para escuchar musica sin limites!"
        );
      } else if (validacion.fetchedData.alert) {
        setSearch({
          artist: "",
          song: currentSong.name,
          link: currentSong.link,
        });
      } else {
        setSearch({
          artist: "Reik",
          song: "Si me dices que si",
          link: "https://www.youtube.com/embed/ieodxKMYRf8",
        });
      }
    }
  }, [validacion]);
  const changeSong = (song) => {
    localStorage.removeItem("name");
    localStorage.removeItem("link");
    setCurrentSong(song);
  };
  console.log(open)

  if (data.isLoading) {
    return (
      <div className="container">
          <div className="loading"/>
      </div>
    );
  } else {
    return (
      <div className="background">
        <div className="lefSideMenu">
          <button
            className="backButton"
            onClick={() => {
              setAtras(true);
            }}
          >
            <ArrowBackIcon style={{ color: green[500], fontSize: 30 }} />
          </button>
          <input
            className="searchBar"
            placeholder="Search song"
            onChange={changeInput}
          ></input>
          <button className="searchSongButton" onClick={searchfunction}>
            Search
          </button>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                style={styleHeaderList}
                component="div"
                id="nested-list-subheader"
                className="listHeader"
              >
                Generos
              </ListSubheader>
            }
            className="listaGeneros"
          >
            {data.fetchedData.map((genero, index) => {
              return (
                <>
                  <ListItem button onClick={handleClick.bind(null,index)} id={genero.id}>
                    <ListItemText primary={genero.name} />
                    {open[index] ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={open[index]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {genero.songs.map((song) => {
                        return (
                          <ListItem className="SongLabel">
                            <ListItemText primary={song.name} />
                            {/*cancion que jala de la base*/}
                            <ListItemIcon
                              onClick={() => {
                                changeSong(song);
                              }}
                            >
                              <PlayCircleFilledWhiteTwoToneIcon
                                style={{ color: green[500], fontSize: 30 }}
                              />
                            </ListItemIcon>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              );
            })}
          </List>
        </div>
        <div className="rightSideSearchData">
          <h3>{search.artist}</h3>
          <h2>{search.song}</h2>
          <iframe
            title="Songs"
            width="600"
            height="300"
            src={linkCancion}
            frameBorder="10"
          />
          <div className="playlistsection">
            <select className="playListSelection">
              <option></option>
              {plnames.fetchedData.map((detail, index) => {
                return <option key={index.toString()}>{detail.name}</option>;
              })}
            </select>
            <button
              className="buttonAddPlayList"
              onClick={() => console.log(currentSong)}
            >
              <AddIcon style={{ color: green[500], fontSize: 30 }} />
            </button>
          </div>
        </div>
      </div>
    );
  }
};
export default Search;
