import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const SongElement = ({ titulo, artista, link, todo }) => {
  const history = useHistory();
  const [play, setplay] = useState(false);

  useEffect(() => {
    if (play) {
      const t = titulo
      const l = link
      localStorage.setItem("name", titulo )
      localStorage.setItem("link", link );
      history.push({
        pathname: '/search',
        state:{
          datos: todo
        }
      });
    }
  }, [play]);

  const style = {
    display: "flex",
    background: "#76ab4b",
    borderRadius: "1rem",
    padding: "2rem",
    justifyContent: "space-between",
    color: "white",
    height: "100px",
    width: "60%",
    //marginLeft: "20%",
    marginTop: "40px",
  };
  const namestyle = {
    marginLeft: "10px",
    fontSize: "25px",
  };
  const buttstyle = {
    position: "relative",
    margin: "10px 10px",
    display: "inline-block",
    right: "0",
  };
  return (
    <div className="main" style={style}>
      <h1 className="songname" style={namestyle}>
        {titulo}
      </h1>
      <h1 className="artistname" style={namestyle}>
        {artista}
      </h1>
      <button
        className="play"
        style={buttstyle}
        onClick={() => {
          setplay(true);
        }}
      >
        Play
      </button>
    </div>
  );
};

export default SongElement;
