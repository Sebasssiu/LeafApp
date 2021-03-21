import React from "react";

const SongElement = ({ titulo, artista }) => {
  const style = {
    background: "#76ab4b",
    color: "white",
    height: "100px",
    width: "60%",
    marginLeft: "20%",
    marginTop: "40px",
    display: "flex",
  };
  const namestyle = {
    marginLeft: "10px",
    fontSize: "25px",
  };
  return (
    <div className="main" style={style}>
      <h1 className="songname" style={namestyle}>
        {titulo}
      </h1>
      <h1 className="artistname" style={namestyle}>
        {artista}
      </h1>
    </div>
  );
};

export default SongElement;
