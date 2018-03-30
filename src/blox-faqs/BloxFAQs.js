import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BloxFAQs.css';

class BloxFAQs extends Component {
  static propTypes = {
    buildingName: PropTypes.string
  };

  render() {
    const { buildingName } = this.props;
    return (
      <div className="BloxFAQs ContentContainer">
        <dl>
          <dt>Why are you doing this?</dt>

          <dd>
            We believe people are being ripped off by energy companies. We want
            to explore new approaches to help groups and communities fight back
            - all whilst getting to know your neighbours better!
          </dd>

          <dt>Why {buildingName ? buildingName : `this block`}?</dt>
          <dd>
            We chose your block because we understand you are with different
            energy providers. We also live around the corner!
          </dd>

          <dt>Are you working for the council?</dt>
          <dd>
            We're not from the council, we're an independent organisation
            working to make life more affordable for groups and communities like
            yours.
          </dd>

          <dt>Are you working for or on behalf of energy companies?</dt>
          <dd>
            No, we want all energy companies to compete to provide you with the
            cheapest tariffs. We're an independent organisation working on
            behalf of you and your community.
          </dd>

          <dt>What's in it for you?</dt>
          <dd>
            It doesn't cost you anything, we only take a fee from the energy
            company. Their fee is what we need to develop Blox further to enable
            more communities save money.
          </dd>

          <dt>How are you being paid by energy companies?</dt>
          <dd>
            We are not paid contractually by them, we will receive a finders fee
            from the cheapest provider.
          </dd>

          <dt>Will I still have a relationship with the energy provider?</dt>

          <dd>
            Yes, we will organise the cheapest tariff on your behalf, and then
            help you switch to them directly.
          </dd>

          <dt>Who are you?!</dt>
          <dd>
            We are three friends who like yourself are tired of being ripped
            off. Life is increasingly expensive for everyone living in cities
            like London. It has never been harder to get by, let alone save.
            <br />
            We want to do something about it!
          </dd>
        </dl>
      </div>
    );
  }
}

export default BloxFAQs;
