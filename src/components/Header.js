import React from 'react';
import $ from 'jquery';
import MediaQuery from 'react-responsive';

import '../css/Header.css';

function Header() {

  const openSideNav = () => {
    console.log("opened")
    $("#sidenav-id").width("200px");
  }

  const closeSideNav = () => {
    console.log("opened")
    $("#sidenav-id").width("0px");
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top">
      <MediaQuery minWidth={1224}>
        <div className="navbar-collapse justify-content-center order-2">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/aboutme/">About Me</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/portfolio/">Portfolio</a>
            </li>
          </ul>
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={1224}>
        <div className="sidenav-container">
          <div id="sidenav-id" className="sidenav">
            <button className="closebtn" onClick={closeSideNav}>&times;</button>
              <a href="/">Home</a>
              <a href="/aboutme/">About Me</a>
              <a  href="/portfolio/">Portfolio</a>
          </div>
          <nav className="navbar navbar-dark">
            <button className="navbar-toggler" type="button">
              <span className="navbar-toggler-icon" onClick={openSideNav}></span>
            </button>
          </nav>
        </div>
      </MediaQuery>

      {/* icons on the right */}
      {/* <div className="navbar-collapse justify-content-center order-2">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="https://github.com/PhuongDTran" target="_blank" rel="noopener noreferrer">
              <img src={process.env.PUBLIC_URL + "/github.png"} alt="" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://www.linkedin.com/in/fuongtran/" target="_blank" rel="noopener noreferrer">
              <img src={process.env.PUBLIC_URL + "/linkedin.png"} alt="" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://stackoverflow.com/users/9512497/fuong" target="_blank" rel="noopener noreferrer">
              <img src={process.env.PUBLIC_URL + "/stackoverflow.png"} alt="" />
            </a>
          </li>
        </ul>
      </div> */}
    </nav>
  );
}
export default Header;