import React from "react"
import "../styles/navBarStyle.css"
import { Link } from 'react-router-dom'
const NavBar = ({ token }) => {
  return (
    <header className="navbox">
      <img src="/bitfinex-leaf.svg" alt="logo" className="logo" />
      <nav>
        <ul className="links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">About Us</a>
          </li>
          <li>
            <a href="/">Contact Us</a>
          </li>
          {token.token ? (
            <>
              <li>
                <Link to="/profile">My account</Link>
              </li>
              <li>
                <Link to="/music">Music player</Link>
              </li>
              <li>
                <a onClick={() => localStorage.clear()} href="/">Log out</a>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )
          }
        </ul>
      </nav>
      <a href="/#" className="prembutton">
        <button>PREMIUM</button>
      </a>
    </header>
  )
}
export default NavBar;
