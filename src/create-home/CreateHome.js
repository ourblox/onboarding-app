import React, { Component } from 'react';
import { Form, Text } from 'react-form';
import EnterNumber from '../components/enter-number/EnterNumber';
import './CreateHome.css';

class CreateHome extends Component {
  state = {
    formBegun: false,
    title: 'Add new home'
  };

  createHome = e => {
    console.log(e);
  };

  handleBegin(submittedValues) {
    if (submittedValues.flatNumber) {
      this.props.db.post(submittedValues);
      this.setState({
        formBegun: true,
        title: submittedValues.flatNumber + ' ' + this.props.buildingName
      });
    }
  }

  handleSubmit(submittedValues) {
    if (submittedValues) {
      this.props.db.post(submittedValues);
    }
  }

  render() {
    const { title, formBegun } = this.state;
    return (
      <div className="CreateHome">
        <h2>{title}</h2>
        {!formBegun && (
          <Form onSubmit={submittedValues => this.handleBegin(submittedValues)}>
            {formApi => (
              <form className="CreateHome-form" onSubmit={formApi.submitForm}>
                <EnterNumber field="flatNumber" placeholder="Flat number" />
                <button className="CreateHome-submitButton" type="submit">
                  Begin
                </button>
              </form>
            )}
          </Form>
        )}
        {formBegun && (
          <Form
            onSubmit={submittedValues => this.handleSubmit(submittedValues)}
          >
            {formApi => (
              <form className="CreateHome-form" onSubmit={formApi.submitForm}>
                <label>Your monthly bill</label>
                <Text field="monthlyBill" placeholder="£ per month" />
                <button className="CreateHome-submitButton" type="submit">
                  Submit
                </button>
              </form>
            )}
          </Form>
        )}
      </div>
    );
  }
}

export default CreateHome;
