import React, { Component } from 'react'
import { Form, Text } from 'react-form';
import EnterNumber from '../components/enter-number/EnterNumber';
class LoginForm extends Component {
  render() {
    const {
      handleSubmit,
      formType
    } = this.props
    return (
      <div className="signup-container">
        <Form onSubmit={handleSubmit}>
          { formApi => (
          <form  onSubmit={formApi.submitForm}>
            <div className="signup-username">
              <EnterNumber  placeholder="Username" field="username"/>

            </div>
            <div className="signup-password">
              <Text placeholder="Password" field="password"/>
            </div>
            <div className="signup-buttons">
            <button onClick={ handleSubmit }>
                          { formType === 'SIGN_UP' ? 'Sign Up' : 'Login' }
            </button>
            </div>
          </form>
          )}
        </Form>
      </div>
    )
  }
}

// LoginForm.propTypes = {
//   fields: PropTypes.object.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//     formType: PropTypes.string.isRequired
// }

export default LoginForm;
