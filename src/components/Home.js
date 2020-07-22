import React from 'react';
import '../css/Home.css'
function Home() {
  const handleClick = () => {
    window.open("Phuong-Tran-Resume.pdf", "_blank");
  }
  return (
    <div className="home">
      <h6>Hello, my name is</h6>
      <h1>Phuong D. Tran</h1>
      <p className="lead">I am a new grad in Computer Science at University of Washington</p>
      <button type="button" className="btn btn-outline-dark" onClick={handleClick}>Download Resume</button>
    </div>
  );
}

export default Home;