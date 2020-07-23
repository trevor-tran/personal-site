import React from 'react';
import '../scss/Home.scss'
function Home() {
  const handleClick = () => {
    window.open("Phuong-Tran-Resume.pdf", "_blank");
  }
  return (
    <React.Fragment>
      <div className="intro">
        <h6>Hello, my name is</h6>
        <h1 style={{ width: "300px" }}><b>Phuong D. Tran</b></h1>
        <p className="lead">I am a new grad in Computer Science at University of Washington, Seattle, Washington.</p>
        <button type="button" className="btn btn-outline-dark" onClick={handleClick}>View my resume</button>
      </div>
      <div className="skills">
        <h2>My skills</h2>
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td>
                <h6>ReactJS</h6>
                <div className="progress">
                  <div className="progress-bar"
                    role="progressbar"
                    aria-valuenow="40"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "40%" }}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default Home;