import React from 'react';
import '../css/AboutMe.css';


function AboutMe() {
  return (
    <div className="aboutme">
      <p className="lead">
        Phuong Tran is passionnate about growing his technical skills
    </p>
      <p className="lead">
        If you wish to communicate sensitive or proprietary information with me, via my email account fuongdtran@gmail.com,
        please make use of an appropriate standards-based encryption package.
        My current choice is: PGP available for purchase at www.pgp.com. Other products that support public key cryptography and DH/DSS keys should work, too.
    </p>
      <p className="lead">
        You must first import my public key into your encryption package's keyring.  My key can be downloaded <a href="phuongtran.asc">here</a><br />
        or by searching for "fuongdtran@gmail.com" on the <a href="https://keys.openpgp.org/" target="_blank" rel="noopener noreferrer">OpenPGP Key server.</a>
      </p>
    </div>
  )
}

export default AboutMe;