import React, { useState, useEffect, useContext } from "react";
import SongElement from "./SongElement";
import { UserContext } from "../App";
import useApi from "../customHooks/useApi";
import "../styles/inputPages.css";

const PlaylistForm = () => {
  //const [plnames, setplnames] = useState([]);
  //const [songinfo, setsonginfo] = useState([]);

  const [currentsongs, setcurrentsongs] = useState([]);
  const [pname, setpname] = useState("");
  const token = useContext(UserContext);
  let ownerid = token.token;

  const plnames = useApi({
    link: "playlists/userPlaylist/",
    method: "POST",
    body: {
      token: ownerid,
    },
  });

  /*
  useEffect(() => {
    fetch("https://leaf-musicapp.herokuapp.com/playlists/", {
      method: method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    })
      .then((r) => r.json())
      .then((r) => setplnames(r));
  }, []);

  useEffect(() => {
    fetch("https://leaf-musicapp.herokuapp.com/songs/")
      .then((r) => r.json())
      .then((r) => setsonginfo(r));
  }, []);
  */
  const wrap = {
    display: "flex",
    position: "relative",
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
    //borderBottom: "5px solid rgba(0, 0, 0, 0, 1)",
  };
  const content = {
    width: "100%",
    marginLeft: "330px",
    padding: "100px 0",
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
                  setcurrentsongs(detail.songs);
                  //setpname(plnames[index].name);
                }}
              >
                {detail.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="maincontent" style={content}>
        <h1 className="playlisttitle" style={sidetitle}>
          {pname}
        </h1>
        {currentsongs.map((detail, index) => {
          console.log(detail);

          //console.log(detail.songs[index].name);
          return <SongElement key={index.toString()} titulo={detail.name} />;
        })}
      </div>
    </div>
  );
};

export default PlaylistForm;
