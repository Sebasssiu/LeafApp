import React from "react";
import "../styles/navBarStyle.css";

const NavBar = () => {
  return (
    <header className="navbox">
      <img src="/bitfinex-leaf.svg" alt="logo" className="logo" />
      <nav>
        <ul className="links">
          <li>
            <a href="/#">Home</a>
          </li>
          <li>
            <a href="/#">About Us</a>
          </li>
          <li>
            <a href="/#">Contact Us</a>
          </li>
        </ul>
      </nav>
      <a href="/#" className="prembutton">
        <button>PREMIUM</button>
      </a>
    </header>
  );
};

export default NavBar;
