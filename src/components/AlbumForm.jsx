import React, { useState, useEffect, useContext } from "react";
import SongElement from "./SongElement";
import { UserContext } from "../App";
import useApi from "../customHooks/useApi";
import "../styles/inputPages.css";

const AlbumForm = () => {
  //const [plnames, setplnames] = useState([]);
  //const [songinfo, setsonginfo] = useState([]);

  const [currentalbums, setcurrentalbums] = useState([]);
  const [aname, setpname] = useState("");
  const token = useContext(UserContext);
  let ownerid = token.token;

  const plnames = useApi({
    link: "albums/useralbum/",
    method: "POST",
    body: {
      token: ownerid,
    },
  });

  const nameinput = () => {
    let playname = prompt("Whats the name of the album?");
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
  };

  const wrap = {
    display: "flex",
    position: "relative",
  };
  const sideb = {
    position: "fixed",
    height: "100%",
    width: "350px",
    background: "crimson",
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
    //borderBottom: "5px solid rgba(0, 0, 0, 0, 1)",
  };
  const content = {
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
          ALBUMS
        </h2>
        <ul>
          {plnames.fetchedData.map((detail, index) => {
            return (
              <li
                key={index.toString()}
                style={listitem}
                onClick={() => {
                  setcurrentalbums(detail.almbum_songs);
                  //setpname(plnames[index].name);
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
        <h1 className="playlisttitle" style={sidetitle}>
          {aname}
        </h1>
        {currentalbums.map((detail, index) => {
          return <SongElement key={index.toString()} titulo={detail.name} />;
        })}
      </div>
    </div>
  );
};

export default AlbumForm;
