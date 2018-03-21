import React, { Component } from 'react';
import './Privacy.css';

class Privacy extends Component {
  render() {
    return (
      <div className="Privacy ContentContainer">
        <h2>Your privacy</h2>
        <p>At Blox, we take your privacy extremely seriously.</p>
        <p>
          You may have noticed we didn't show one of those annoying cookie
          notices. This is because we don't allow any third parties to place
          tracking cookies on this site (such as Google via their Analytics
          service, or Facebook through their Like Button).
        </p>
        <p>
          The information you enter is stored in a database that is only
          accessible to logged-in users from your building.
        </p>
        <p>
          We have deliberately not asked for any data that might be considered
          sensitive, such as your email or phone number. Instead, we will
          communicate via notices in the lobby and resident forums.
        </p>
        <p>
          You can request that every trace of the information you have provided
          to us be permanently deleted by emailing{' '}
          <a href="mailto:info@ourblox.org">info@ourblox.org</a>
        </p>
        <p>
          We truly respect your privacy and your ultimate ownership of all the
          information you provide to us to help us make this project successful.{' '}
        </p>
      </div>
    );
  }
}

export default Privacy;
