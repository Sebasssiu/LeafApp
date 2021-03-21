import React from "react";

const SongElement = ({ titulo, artista }) => {
  const style = {
    display: "flex",
    background: "#76ab4b",
    borderRadius: "1rem",
    padding: "2rem",
    justifyContent: "space-between",
    color: "white",
    height: "100px",
    width: "60%",
    marginLeft: "20%",
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
      <button className="play" style={buttstyle}>
        Play
      </button>
    </div>
  );
};

export default SongElement;
