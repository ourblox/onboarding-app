import React, { Component } from 'react';
import { Text } from 'react-form';
import './CustomFormFields.css';

class EnterPasscode extends Component {
  render() {
    return <Text {...this.props} className="EnterPasscode" type="text" />;
  }
}

export default EnterPasscode;
