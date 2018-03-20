import React, { Component } from 'react';
import { Text } from 'react-form';
import './CustomFormFields.css';

class EnterNumber extends Component {
  render() {
    return <Text {...this.props} className="EnterNumber" type="text" />;
  }
}

export default EnterNumber;
