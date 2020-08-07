import React from 'react';
import $ from 'jquery';
import MediaQuery from 'react-responsive';

import '../css/Header.css';

function Header() {

  const LINKS = [
    {
      href: "https://github.com/PhuongDTran",
      image: process.env.PUBLIC_URL + "/github.png"
    },
    {
      href: "https://www.linkedin.com/in/fuongtran/",
      image: process.env.PUBLIC_URL + "/linkedin.png"
    },
    {
      href: "https://stackoverflow.com/users/9512497/fuong",
      image: process.env.PUBLIC_URL + "/stackoverflow.png"
    }
  ];
  
  const openSideNav = () => {
    console.log("opened")
    $("#sidenav-id").width("200px");
  }

  const closeSideNav = () => {
    console.log("opened")
    $("#sidenav-id").width("0px");
  }


  const makeIcons = (links) => {
    return links.map((e, i) =>
      <li key={i} className="nav-item">
        <a className="nav-link" href={e.href} target="_blank" rel="noopener noreferrer">
          <img src={e.image} alt="" />
        </a>
      </li>
    );
  }

  return (
    <nav className="navbar navbar-expand navbar-dark fixed-top">
      {/* big screen */}
      <MediaQuery minWidth={1224}>
        <div className="left-container navbar-collapse justify-content-start order-1">
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
      {/* small screen */}
      <MediaQuery maxWidth={1224}>
        <div className="sidenav-container left-container navbar-collapse justify-content-start order-1">
          <nav className="navbar">
            <span className="navbar-toggler-icon" onClick={openSideNav}></span>
          </nav>
          <div id="sidenav-id" className="left-container sidenav" >
            <button className="closebtn" onClick={closeSideNav}>&times;</button>
            <a href="/">Home</a>
            <a href="/aboutme/">About Me</a>
            <a href="/portfolio/">Portfolio</a>
          </div>
        </div>
      </MediaQuery>

      {/* icons on the right */}
      <div className="right-container navbar-collapse justify-content-end order-2">
        <ul className="navbar-nav">
         {makeIcons(LINKS)}
        </ul>
      </div>
    </nav>
  );
}
export default Header;