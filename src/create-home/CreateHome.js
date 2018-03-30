import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-form';
import CreateHomeForm from './CreateHomeForm';
import EnterNumber from '../components/custom-form-fields/EnterNumber';

import './CreateHome.css';

class CreateHome extends Component {
  static propTypes = {
    localDb: PropTypes.object.isRequired,
    buildingSlug: PropTypes.string.isRequired,
    buildingName: PropTypes.string.isRequired
  };

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
    const { localDb, buildingSlug, buildingName } = this.props;
    return (
      <div className="CreateHome">
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
            <CreateHomeForm
              flatNumber={flatNumber}
              localDb={localDb}
              buildingSlug={buildingSlug}
              buildingName={buildingName}
            />
          )}
      </div>
    );
  }
}

export default CreateHome;
