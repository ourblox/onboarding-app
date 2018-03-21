import React, { Component } from 'react';
import { Form, Text } from 'react-form';
import CreateHomeFormHOC from './CreateHomeFormHOC.js';
import './CreateHomeForm.css';

class CreateHomeForm extends Component {
  state = {
    rev: null,
    previousAnswers: {}
  };

  setShowFields = () => {
    this.props.updatePreviousAnswers();
  };

  handleSubmit = submittedValues => {
    const buildingSlug = this.props.buildingSlug;
    if (submittedValues) {
      submittedValues._id = this.props.documentId;
      submittedValues.type = 'buildingRecord';
      submittedValues.buildingId = buildingSlug;
      if (this.props.rev) {
        submittedValues._rev = this.props.rev;
      }
      this.props.db
        .post(submittedValues)
        .then(response => {
          this.props.updateRev(response.rev);
          this.props.setHiddenFields();
        })
        .catch(err => console.debug(err));
    }
  };

  render() {
    const { displayFields, previousAnswers } = this.props;
    if (!this.props.checked) return <div>Waiting</div>;
    return (
      <div>
        {!displayFields && (
          <div className="BoxContainer">
            <h3>Your details have been saved. Thank you.</h3>
            <button onClick={this.setShowFields}>View / Edit</button>
          </div>
        )}
        {displayFields && (
          <Form
            onSubmit={submittedValues => this.handleSubmit(submittedValues)}
          >
            {formApi => (
              <div>
                <h3>{this.props.flatAndBuilding}</h3>
                <form className="CreateHome-form" onSubmit={formApi.submitForm}>
                  <label>Rough monthly energy bill?</label>
                  <Text
                    field="monthlyBill"
                    placeholder="£"
                    type="number"
                    defaultValue={previousAnswers.monthlyBill}
                  />
                  <label>Number of occupants</label>
                  <Text
                    field="inhabitants"
                    placeholder="1"
                    type="number"
                    defaultValue={previousAnswers.inhabitants}
                  />
                  <label>Which provider are you with?</label>
                  <Text
                    field="provider"
                    placeholder="..."
                    defaultValue={previousAnswers.provider}
                  />
                  <label>How long have you been with them?</label>
                  <Text
                    field="providerDuration"
                    placeholder="Months"
                    type="number"
                    defaultValue={previousAnswers.providerDuration}
                  />
                  <label>Do you like them?</label>
                  <Text
                    field="providerNotes"
                    placeholder="..."
                    defaultValue={previousAnswers.providerNotes}
                  />
                  <label>When was the last time you switched?</label>
                  <Text
                    field="switched"
                    placeholder="..."
                    defaultValue={previousAnswers.switched}
                  />
                  <label>Are you the main account holder?</label>
                  <Text
                    field="mainAccountHolder"
                    placeholder="..."
                    defaultValue={previousAnswers.mainAccountHolder}
                  />
                  <button className="CreateHome-submitButton" type="submit">
                    Save details
                  </button>
                </form>
              </div>
            )}
          </Form>
        )}
      </div>
    );
  }
}

export default CreateHomeFormHOC(CreateHomeForm);
