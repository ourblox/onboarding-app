import React, { Component } from 'react';
import { Form, Text } from 'react-form';
import './LoginForm.css';

class LoginForm extends Component {
  render() {
    const { handleSubmit, formType } = this.props;
    return (
      <div className="LoginForm BoxContainer">
        <h3>
          {formType === 'SIGN_UP'
            ? 'Create new account'
            : 'Your login details are on the card we gave you'}
        </h3>
        <Form onSubmit={handleSubmit}>
          {formApi => (
            <form onSubmit={formApi.submitForm}>
              <div className="signup-username">
                <Text placeholder="Username" field="username" />
              </div>
              <div className="signup-password">
                <Text placeholder="Password" field="password" type="password" />
              </div>
              <div className="signup-buttons">
                <button onClick={handleSubmit}>
                  {formType === 'SIGN_UP' ? 'Sign Up' : 'Go'}
                </button>
              </div>
            </form>
          )}
        </Form>
      </div>
    );
  }
}

// LoginForm.propTypes = {
//   fields: PropTypes.object.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//     formType: PropTypes.string.isRequired
// }

export default LoginForm;
