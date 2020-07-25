import React from 'react';
import '../css/MessageBox.css';

function MessageBox() {

  return (
    <form className="message-box">
      <div className="row">
        <div className="col">
          <input type="text" className="form-control" placeholder="Name" />
        </div>
        <div className="col">
          <input type="text" className="form-control" placeholder="Email" />
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
  );
}

export default MessageBox;