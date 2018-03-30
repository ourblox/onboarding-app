import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './DismissableMessage.css';

class DismissableMessage extends Component {
  static propTypes = {
    message: PropTypes.string,
    handleDismissMessage: PropTypes.func.isRequired
  };

  dismissMessage = () => {
    this.props.handleDismissMessage();
  };

  render() {
    const { message } = this.props;
    return (
      <div className="DismissableMessage BoxContainer">
        <p>{message}</p>
        <button onClick={this.dismissMessage}>Dismiss</button>
      </div>
    );
  }
}
export default DismissableMessage;
