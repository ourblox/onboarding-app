import React, { Component } from 'react';
import { Form, Text, Select } from 'react-form';
import PropTypes from 'prop-types';
import CreateHomeFormHOC from './CreateHomeFormHOC.js';
import './CreateHomeForm.css';

class CreateHomeForm extends Component {
  static propTypes = {
    localDb: PropTypes.object.isRequired,
    buildingSlug: PropTypes.string.isRequired,
    buildingName: PropTypes.string.isRequired,
    flatNumber: PropTypes.string.isRequired,
    updateRev: PropTypes.func.isRequired,
    updatePreviousAnswers: PropTypes.func.isRequired,
    rev: PropTypes.string,
    setHiddenFields: PropTypes.func.isRequired
  };

  state = {
    rev: null,
    previousAnswers: {}
  };

  setShowFields = () => {
    this.props.updatePreviousAnswers();
  };

  handleSubmit = submittedValues => {
    const {
      localDb,
      buildingSlug,
      documentId,
      rev,
      updateRev,
      setHiddenFields
    } = this.props;
    if (submittedValues) {
      submittedValues._id = documentId;
      submittedValues.type = 'buildingRecord';
      submittedValues.buildingId = buildingSlug;
      if (rev) {
        submittedValues._rev = rev;
      }
      localDb
        .post(submittedValues)
        .then(response => {
          updateRev(response.rev);
          setHiddenFields();
        })
        .catch(err => console.debug(err));
    }
  };

  yesNoOptions = [
    {
      label: 'Yes',
      value: true
    },
    {
      label: 'No',
      value: false
    }
  ];

  happinessScore = [
    { label: 'Very happy', value: 5 },
    { label: "They're OK", value: 4 },
    { label: 'Neutral', value: 3 },
    { label: "They're not OK", value: 2 },
    { label: 'Very unhappy', value: 1 }
  ];

  lastSwitch = [
    { label: 'Within the last few months', value: 1 },
    { label: 'Within the last year', value: 2 },
    { label: 'Within the last two years', value: 3 },
    { label: 'Within the last three years', value: 4 },
    { label: 'Within the last five years', value: 5 },
    { label: 'Within the last ten years', value: 6 },
    { label: "I've never switched", value: 7 }
  ];

  lengthInProperty = [
    { label: 'Very recently', value: 1 },
    { label: 'Over six months', value: 2 },
    { label: 'Over a year', value: 3 },
    { label: 'Over two years', value: 4 },
    { label: 'Over three years', value: 5 },
    { label: 'Over five years', value: 6 },
    { label: 'Over ten years', value: 7 },
    { label: 'Over twenty years', value: 8 },
    { label: 'Over thirty years', value: 9 }
  ];

  energyCompanies = [
    {
      label: 'Atlantic',
      value: 'Atlantic'
    },
    {
      label: 'Avro Energy',
      value: 'Avro Energy'
    },
    {
      label: 'Better Energy',
      value: 'Better Energy'
    },

    {
      label: 'Bristol Energy',
      value: 'Bristol Energy'
    },

    {
      label: 'British Gas',
      value: 'British Gas'
    },

    {
      label: 'bulb',
      value: 'bulb'
    },

    {
      label: 'Co-operative Energy',
      value: 'Co-operative Energy'
    },

    {
      label: 'daligas',
      value: 'daligas'
    },

    {
      label: 'E.ON',
      value: 'E.ON'
    },

    {
      label: 'EBICo',
      value: 'EBICo'
    },

    {
      label: 'ecotricity',
      value: 'ecotricity'
    },

    {
      label: 'EDF Energy',
      value: 'EDF Energy'
    },

    {
      label: 'extraenergy',
      value: 'extraenergy'
    },

    {
      label: 'Flow Energy',
      value: 'Flow Energy'
    },

    {
      label: 'GB energy supply',
      value: 'GB energy supply'
    },

    {
      label: 'GnERGY',
      value: 'GnERGY'
    },

    {
      label: 'Go Effortless Energy',
      value: 'Go Effortless Energy'
    },

    {
      label: 'Good Energy',
      value: 'Good Energy'
    },

    {
      label: 'green energy uk',
      value: 'green energy uk'
    },

    {
      label: 'Green Star Energy',
      value: 'Green Star Energy'
    },

    {
      label: 'IRESA Limited',
      value: 'IRESA Limited'
    },

    {
      label: 'isupplyenergy',
      value: 'isupplyenergy'
    },

    {
      label: 'LoCo2 Energy',
      value: 'LoCo2 Energy'
    },

    {
      label: 'M&S Energy',
      value: 'M&S Energy'
    },

    {
      label: 'npower',
      value: 'npower'
    },

    {
      label: 'Octopus energy',
      value: 'Octopus energy'
    },

    {
      label: 'Oink energy',
      value: 'Oink energy'
    },

    {
      label: 'Ovo energy',
      value: 'Ovo energy'
    },

    {
      label: 'PFP energy',
      value: 'PFP energy'
    },

    {
      label: 'Robin Hood Energy',
      value: 'Robin Hood Energy'
    },

    {
      label: "Sainsbury's Energy",
      value: 'Sainsburys Energy'
    },

    {
      label: 'ScottishPower',
      value: 'ScottishPower'
    },

    {
      label: 'So energy',
      value: 'So energy'
    },

    {
      label: 'Spark Energy',
      value: 'Spark Energy'
    },

    {
      label: 'SSE',
      value: 'SSE'
    },

    {
      label: 'SSE Southern Electric',
      value: 'SSE Southern Electric'
    },

    {
      label: 'SSE ScottishHydro',
      value: 'SSE ScottishHydro'
    },

    {
      label: 'SSE Swalec',
      value: 'SSE Swalec'
    },

    {
      label: 'Telecom Plus (The Utility Warehouse)',
      value: 'Telecom Plus (The Utility Warehouse)'
    },

    {
      label: 'Utilita',
      value: 'Utilita'
    },

    {
      label: 'Utility Warehouse',
      value: 'Utility Warehouse'
    },

    {
      label: 'Zog Energy',
      value: 'Zog Energy'
    },
    {
      label: 'Other',
      value: 'Other'
    }
  ];

  render() {
    const { displayFields, previousAnswers } = this.props;

    return (
      <div>
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
                  <form
                    className="CreateHome-form"
                    onSubmit={formApi.submitForm}
                  >
                    <label>How long have you lived here?</label>
                    <Select
                      field="lengthInProperty"
                      options={this.lengthInProperty}
                      defaultValue={previousAnswers.lengthInProperty}
                    />
                    <label>Are you on a pre-pay meter?</label>
                    <Select
                      field="prePay"
                      options={this.yesNoOptions}
                      defaultValue={previousAnswers.prePay}
                    />
                    <label>Rough monthly energy spend?</label>
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
                    <Select
                      field="energyProvider"
                      options={this.energyCompanies}
                      defaultValue={previousAnswers.energyProvider}
                    />
                    <label>How long have you been with them?</label>
                    <Select
                      field="providerDuration"
                      options={this.lengthInProperty}
                      defaultValue={previousAnswers.providerDuration}
                    />
                    <label>How happy are you with them?</label>
                    <Select
                      field="providerHappiness"
                      options={this.happinessScore}
                      defaultValue={previousAnswers.providerHappiness}
                    />
                    <label>When was the last time you switched?</label>
                    <Select
                      field="lastSwitched"
                      options={this.lastSwitch}
                      defaultValue={previousAnswers.lastSwitched}
                    />
                    <label>Are you the main account holder?</label>
                    <Select
                      field="accountHolder"
                      options={this.yesNoOptions}
                      defaultValue={previousAnswers.accountHolder}
                    />
                    <p>
                      By completing this form, you are giving Blox your consent
                      to attempt to negotiate discounted energy for you and your
                      neighbours from the UK's energy companies. There is no
                      obligation for you to switch – you can change your mind at
                      any time.
                    </p>
                    <button className="CreateHome-submitButton" type="submit">
                      Save details
                    </button>
                  </form>
                </div>
              )}
            </Form>
          )}
        </div>
      </div>
    );
  }
}

export default CreateHomeFormHOC(CreateHomeForm);
