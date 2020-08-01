import React, { useRef } from 'react';
import '../css/MessageBox.css';
import emailjs from 'emailjs-com';

function MessageBox() {
  // emailJS IDs
  const USER_ID = "user_5RutmXyXKICZtgrRLNv11";
  const SERVICE_ID = "my_site_message_service";
  const TEMPLATE_ID = "message_template";

  const fields = useRef({ user_name: "", user_email: "", subject: "", message: "" });

  const sendEmail = e => {
    e.preventDefault();
    if (isValid()) {
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
        .then((result) => {
          alert(result.text);
        }, (error) => {
          alert(error.text);
        });
    } else {
      alert("Invalid Input(s)!");
    }
  }

  const isValid = () => {
    return Object.values(fields.current).reduce((acc, cur) => !!acc & !!cur);
  }

  const handleChange = (e) => {
    fields.current[e.target.name] = e.target.value;
    console.log(fields.current);
  }

  return (
    <form className="message-box" onSubmit={sendEmail}>
      <div className="row">
        <div className="col">
          <input type="text" className="form-control shadow-none" name="user_name" placeholder="Name" onChange={handleChange} />
        </div>
        <div className="col">
          <input type="text" className="form-control shadow-none" name="user_email" placeholder="Email" onChange={handleChange} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <input type="text" className="form-control shadow-none" name="subject" placeholder="Subject" onChange={handleChange} />
        </div>
      </div>
      <div className="row message">
        <div className="col message">
          <textarea type="text" className="form-control shadow-none" name="message" placeholder="Message" onChange={handleChange} />
        </div>
      </div>
      <button type="submit" className="btn btn-primary mb-2 send-button shadow-none">Send Message</button>
    </form>
  );
}

export default MessageBox;