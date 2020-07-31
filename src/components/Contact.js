import React from 'react';
import '../css/Contact.css'
function Contact({image, title, content, width, height}) {
  return (
    <div className="contact" style={{width, height}} >
      <div>
       <img src={image} alt=""/>
      </div>
      <div>
      <h2>{title}</h2>
      </div>
      <div>
        <p>{content}</p>
      </div>
    </div>
  )
}

export default Contact;