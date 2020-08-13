import React, { useState } from 'react';
import '../css/MessageBox.css';
import emailjs from 'emailjs-com';

function MessageBox() {
  // emailJS IDs
  const USER_ID = "user_5RutmXyXKICZtgrRLNv11";
  const SERVICE_ID = "my_site_message_service";
  const TEMPLATE_ID = "message_template";

  const [fields, setFields] = useState({ user_name: "", user_email: "", subject: "", message: "" });

  const sendEmail = e => {
    e.preventDefault();
    if (isValid()) {
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
        .then((result) => {
          //clear out inputs
          setFields({ user_name: "", user_email: "", subject: "", message: "" });
          alert(result.text);
        }, (error) => {
          alert(error.text);
        });
    } else {
      alert("Invalid Input(s)!");
    }
  }

  const isValid = () => {
    return Object.values(fields).reduce((acc, cur) => !!acc & !!cur);
  }

  const handleChange = (e) => {
    let clone = {...fields};
    clone[e.target.name] = e.target.value;
    setFields(clone);
  }

  return (
    <form className="message-box d-flex h-100 flex-column" onSubmit={sendEmail}>
      <div className="row">
        <div className="col">
          <input type="text" className="form-control shadow-none" name="user_name" placeholder="Name" value={fields.user_name} onChange={handleChange} />
        </div>
        <div className="col">
          <input type="text" className="form-control shadow-none" name="user_email" placeholder="Email" value={fields.user_email}  onChange={handleChange} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <input type="text" className="form-control shadow-none" name="subject" placeholder="Subject" value={fields.subject} onChange={handleChange} />
        </div>
      </div>
      <div className="row flex-fill">
        <div className="col">
          <textarea type="text" className="form-control shadow-none message-input" name="message" placeholder="Message" value={fields.message} onChange={handleChange} />
        </div>
      </div>
      <button type="submit" className="btn btn-primary shadow-none send-button">Send Message</button>
    </form>
  );
}

export default MessageBox;