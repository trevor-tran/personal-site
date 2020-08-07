import React from 'react';
import '../css/AboutMe.css';
import MapContainer from './MapContainer';
import MessageBox from './MessageBox';
import Contact from './Contact';

function AboutMe() {

  const contactInfo = [
    {
      image: process.env.PUBLIC_URL + "/location.png",
      title: "My Location",
      content: "Renton, WA 98055"
    },
    {
      image: process.env.PUBLIC_URL + "/phone.png",
      title: "Phone Number",
      content: "+1(206) 898-7083",
    },
    {
      image: process.env.PUBLIC_URL + "/mail.png",
      title: "Email Address",
      content: "fuongdtran@gmail.com"
    }
  ];

  const makeContact = (contactInfo) => {
    return contactInfo.map(e =>
        <Contact key={e.title} image={e.image} title={e.title} content={e.content}/>
    );
  }
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
          You must first import my public key into your encryption package's keyring.  My key can be downloaded <a href={process.env.PUBLIC_URL + "/phuongtran.asc"}>here </a>
          or by searching for "fuongdtran@gmail.com" on the <a href="https://keys.openpgp.org/" target="_blank" rel="noopener noreferrer">OpenPGP Key server.</a>
        </p>
      </div>
      <div className="contact-container">
        {makeContact(contactInfo)}
      </div>
      <div className="message-map-container">
        <div className="message-container shadow p-3 mb-5 bg-white rounded">
          <MessageBox/>
        </div>
        <div className="map-container shadow p-3 mb-5 bg-white rounded">
          <MapContainer/>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AboutMe;