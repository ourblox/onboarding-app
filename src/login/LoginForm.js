import React, { Component } from 'react';
import { Form } from 'react-form';
import EnterNumber from '../components/custom-form-fields/EnterNumber';
import EnterPasscode from '../components/custom-form-fields/EnterPasscode';
import './LoginForm.css';

class LoginForm extends Component {
  render() {
    const { handleSubmit, formType } = this.props;
    return (
      <div className="LoginForm BoxContainer">
        <h3>
          {formType === 'SIGN_UP'
            ? 'Add new account'
            : 'Your access details are on the card we gave you'}
        </h3>
        <Form onSubmit={handleSubmit}>
          {formApi => (
            <form onSubmit={formApi.submitForm}>
              <EnterNumber placeholder="Door number" field="username" />

              <EnterPasscode placeholder="Access code" field="password" />

              <div className="signup-buttons">
                <button onClick={handleSubmit}>Go</button>
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
