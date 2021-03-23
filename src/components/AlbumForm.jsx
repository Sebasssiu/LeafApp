import React, { useState, useEffect, useContext } from "react";
import SongElement from "./SongElement";
import { UserContext } from "../App";
import useApi from "../customHooks/useApi";
import "../styles/inputPages.css";

const AlbumForm = () => {
  const [currentalbums, setcurrentalbums] = useState([]);
  const [currentalbumid, setcurrentalbumid] = useState(9);
  const [currentname, setcurrentname] = useState("");
  const [currentgenre, setcurrentgenre] = useState("");
  const [currentlink, setcurrentlink] = useState("");
  const [currentdate, setcurrentdate] = useState("");
  const [showform, setformstate] = useState(false);
  const [booleancall, setcall] = useState(false);
  const [displaytext, setdisplaytext] = useState(false);
  const token = useContext(UserContext);
  let ownerid = token.token;

  const plnames = useApi({
    link: "albums/useralbum/",
    call: booleancall,
    method: "POST",
    body: {
      token: ownerid,
    },
  });

  const availablegenres = useApi({
    link: "genres/",
    method: "GET",
  });

  const sendData = (sname, gen, slink, sdate) => {
    if (sname && gen && slink && sdate != "") {
      fetch("https://leaf-musicapp.herokuapp.com/songs/createsong/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: ownerid,
          name: sname,
          genre: gen,
          link: slink,
          date: sdate,
          album: currentalbumid,
        }),
      });
      alert("Song added, refresh page to see changes");
      // aqui hay que setear el estado
      //setcurrentalbums
      setcall(!booleancall);
    } else {
      alert("Ingresa todos los campos");
    }
  };

  const nameinput = () => {
    let playname = prompt("Whats the name of the album?");
    fetch("https://leaf-musicapp.herokuapp.com/albums/createalbum/", {
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
  };
  const content = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginLeft: "330px",
    padding: "100px 0",
  };
  const content2 = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    padding: "100px 0",
  };
  const butt = {
    position: "absolute",
    marginBottom: "70px",
    right: "0",
    bottom: "0",
  };
  const genreselect = {
    width: "340px",
    height: "50px",
  };

  const textstyle = {
    color: "white",
  };

  if (plnames.isLoading || availablegenres.isLoading) {
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
                  setdisplaytext(true);
                  setformstate(true);
                  setcurrentalbums(detail.almbum_songs);
                  setcurrentalbumid(detail.id);
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
        {displaytext === false ? (
          <div className="padre">
            <h1 style={textstyle}>Selecicona un album</h1>
            <h2 style={textstyle}>Pasos para obtener el link de tu cancion</h2>
            <ol>
              <li>Ingresar a tu cancion en Youtube</li>
              <li>
                En la parte inferior del video, seleccionar la opción de
                compartir
              </li>
              <li>Seleccionar la opcion de "Incorporar"</li>
              <li>Copiar el link que proporciona youtube</li>
              <li>
                Ejemplo de link: https://www.youtube.com/embed/fEYUoBgYKzw
              </li>
            </ol>
          </div>
        ) : null}
        {showform === true ? (
          <div className="father" style={content2}>
            <h1 className="createsong">AGREGAR CANCION</h1>
            <input
              className="songname"
              type="text"
              placeholder={"Nombre de la cancion"}
              onChange={(event) => setcurrentname(event.target.value)}
            />
            <select
              className="songgenre"
              style={genreselect}
              onChange={(event) => setcurrentgenre(event.target.value)}
            >
              <option></option>
              {availablegenres.fetchedData.map((detail, index) => {
                return <option key={index.toString()}>{detail.name}</option>;
              })}
            </select>
            <input
              type="text"
              className="songlink"
              placeholder={"Link (Youtube)"}
              onChange={(event) => setcurrentlink(event.target.value)}
            />
            <input
              className="songdate"
              type="date"
              onChange={(event) => setcurrentdate(event.target.value)}
            ></input>
            <button
              className="confirm"
              onClick={() => {
                sendData(currentname, currentgenre, currentlink, currentdate);
                // agregar aqui
              }}
            >
              Enviar
            </button>
          </div>
        ) : null}
        {currentalbums.map((detail, index) => {
          if (detail.is_active === true) {
            return (
              <SongElement
                key={index.toString()}
                titulo={detail.name}
                link={detail.link}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default AlbumForm;
