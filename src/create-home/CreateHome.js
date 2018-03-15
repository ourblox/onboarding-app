import React, { Component } from 'react';
import { Form } from 'react-form';
import CreateHomeForm from './CreateHomeForm';
import { Redirect } from 'react-router-dom';
import EnterNumber from '../components/enter-number/EnterNumber';

import './CreateHome.css';

class CreateHome extends Component {
  state = {
    formBegun: false,
    flatNumber: 0
  };

  handleBegin(submittedValues) {
    if (submittedValues.flatNumber) {
      this.setState({
        formBegun: true,
        flatNumber: submittedValues.flatNumber
      });
    }
  }

  render() {
    const { formBegun, flatNumber } = this.state;
    const { buildingName } = this.props;
    return (
      <div className="CreateHome ContentContainer">
        {!this.props.loggedIn && <Redirect to="/login" />}

        {!formBegun && (
          <div className="BoxContainer">
            <h3>Add new home</h3>
            <Form
              onSubmit={submittedValues => this.handleBegin(submittedValues)}
            >
              {formApi => (
                <form className="CreateHome-form" onSubmit={formApi.submitForm}>
                  <EnterNumber field="flatNumber" placeholder="Flat number" />
                  <button className="CreateHome-submitButton" type="submit">
                    Begin
                  </button>
                </form>
              )}
            </Form>
          </div>
        )}
        {formBegun && (
          <CreateHomeForm
            db={this.props.db}
            flatNumber={flatNumber}
            buildingName={buildingName}
          />
        )}
      </div>
    );
  }
}

export default CreateHome;
