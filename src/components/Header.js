import React from 'react';
import "../css/Header.css"
function Header() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top">
      <div className="navbar-collapse justify-content-center order-2">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/aboutme/">About Me</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/porfolio/">Porfolio</a>
          </li>
        </ul>
      </div>
      <div className="navbar-collapse collapse justify-content-center order-2">
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
      </div>
    </nav>
  );
}
export default Header;