import React, { useState, useContext } from "react";
import SongElement from "./SongElement";
import { UserContext } from "../App";
import useApi from "../customHooks/useApi";
import "../styles/inputPages.css";

const PlaylistForm = () => {
  const [currentsongs, setcurrentsongs] = useState([]);
  const token = useContext(UserContext);
  const [booleancall, setcall] = useState(false);
  const [emptylist, setemptylist] = useState(false);
  let ownerid = token.token;

  const plnames = useApi({
    link: "playlists/userPlaylist/",
    call: booleancall,
    method: "POST",
    body: {
      token: ownerid,
    },
  });

  const nameinput = () => {
    let playname = prompt("Whats the name of the playlist?");
    fetch("https://leaf-musicapp.herokuapp.com/playlists/createplaylist/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: ownerid,
        name: playname,
      }),
    });
    setcall(!booleancall);
    console.log(booleancall);
  };

  const wrap = {
    display: "flex",
    position: "relative",
    backgroundColor: "rgb(3, 5, 12)",
    minHeight: "100vh",
  };
  const sideb = {
    position: "fixed",
    height: "100%",
    width: "350px",
    background: "#76ab4b",
    padding: "30px 0",
  };
  const sidetitle = {
    color: "white",
    textAlign: "center",
    marginTop: "10px",
    fontSize: "40px",
    marginBottom: "30px",
  };
  const listitem = {
    color: "white",
    padding: "15px",
    borderTop: "1px solid rgb(212, 212, 212, 1)",
    borderBottom: "1px solid rgb(212, 212, 212, 1)",
  };
  const content = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginLeft: "330px",
    padding: "100px 0",
  };
  const butt = {
    position: "absolute",
    marginBottom: "70px",
    right: "0",
    bottom: "0",
  };
  const emptystyle = {
    color: "white",
  };
  if (plnames.isLoading) {
    return (
      <div className="container">
        <div className="loading" />
      </div>
    );
  }
  return (
    <div className="wrapper" style={wrap}>
      <div className="sidebar" style={sideb}>
        <h2 className="ptitle" style={sidetitle}>
          PLAYLISTS
        </h2>
        <ul>
          {plnames.fetchedData.map((detail, index) => {
            return (
              <li
                key={index.toString()}
                style={listitem}
                onClick={() => {
                  if (detail.songs.length === 0) {
                    setcurrentsongs(detail.songs);
                    setemptylist(false);
                  } else {
                    setemptylist(true);
                    setcurrentsongs(detail.songs);
                  }
                }}
              >
                {detail.name}
              </li>
            );
          })}
        </ul>
        <button className="createplaylist" style={butt} onClick={nameinput}>
          +
        </button>
      </div>
      <div className="maincontent" style={content}>
        {emptylist === false ? (
          <h1 style={emptystyle}>
            Esta playlist está vacía, agrega canciones en el reproductor de
            musica
          </h1>
        ) : null}
        {currentsongs.map((detail, index) => {
          if (detail.is_active === true) {
            return (
              <SongElement
                key={index.toString()}
                titulo={detail.name}
                link={detail.link}
                todo={detail}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default PlaylistForm;
