import React from 'react';
import '../css/AboutMe.css';
import MapContainer from './MapContainer';

function AboutMe() {
  return (
    <React.Fragment>
      <div className="aboutme">
        <p className="lead">Phuong Tran is passionnate about growing his technical skills</p>
        <p className="lead">
          If you wish to communicate sensitive or proprietary information with me, via my email account fuongdtran@gmail.com,
          please make use of an appropriate standards-based encryption package.
          My current choice is: PGP available for purchase at www.pgp.com. Other products that support public key cryptography and DH/DSS keys should work, too.
        </p>
        <p className="lead">
          You must first import my public key into your encryption package's keyring.  My key can be downloaded <a href="phuongtran.asc">here </a>
          or by searching for "fuongdtran@gmail.com" on the <a href="https://keys.openpgp.org/" target="_blank" rel="noopener noreferrer">OpenPGP Key server.</a>
        </p>
      </div>

      <div className="message-location">
        <div className="message">
          <form>
            <div className="row">
              <div className="col">
                <input type="text" className="form-control" placeholder="Name"/>
              </div>
              <div className="col">
                <input  type="text" className="form-control" placeholder="Email" />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <input type="text" className="form-control" placeholder="Subject" />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <textarea type="text" className="form-control" placeholder="Message" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mb-2 send-button">Send Message</button>
          </form>
        </div>
        <div className="location">
          <MapContainer/>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AboutMe;