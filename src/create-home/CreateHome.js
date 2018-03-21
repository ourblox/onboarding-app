import React, { Component } from 'react';
import { Form } from 'react-form';
import CreateHomeForm from './CreateHomeForm';
import { Redirect } from 'react-router-dom';
import EnterNumber from '../components/custom-form-fields/EnterNumber';

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
    const { buildingName, buildingSlug } = this.props;
    return (
      <div className="CreateHome">
        {!this.props.loggedIn && <Redirect to="/login" />}

        {!formBegun && (
          <div className="BoxContainer">
            <h3>Add new home</h3>
            <Form
              onSubmit={submittedValues => this.handleBegin(submittedValues)}
            >
              {formApi => (
                <form className="CreateHome-form" onSubmit={formApi.submitForm}>
                  <EnterNumber field="flatNumber" placeholder="Door number" />
                  <button className="CreateHome-submitButton" type="submit">
                    Begin
                  </button>
                </form>
              )}
            </Form>
          </div>
        )}
        {formBegun &&
          buildingSlug && (
            <div className="ContentContainer">
              <CreateHomeForm
                db={this.props.db}
                checked={true}
                flatNumber={flatNumber}
                buildingName={buildingName}
                buildingSlug={buildingSlug}
              />
            </div>
          )}
      </div>
    );
  }
}

export default CreateHome;
