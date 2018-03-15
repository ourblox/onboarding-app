import React, { Component } from 'react';
import './AboutBlox.css';

class AboutBlox extends Component {
  render() {
    return (
      <div className="AboutBlox">
        <h2>FAQs</h2>
        <dl>
          <dt>Why are you doing this?</dt>

          <dd>
            We believe people are being ripped off by energy companies. We want
            to explore a new approach where groups work together. And you get to
            know your neighbours better!
          </dd>

          <dt>What’s in this for you?</dt>

          <dd>
            It doesn’t cost you anything. We’re going to take a finders fee from
            the energy provider. It’s also the first step towards a Blox tool
            that enables loads of people to save money.
          </dd>

          <dt>What’s your business model?</dt>

          <dd>
            We’re going to take a finders fee from the energy provider. It
            doesn’t cost you anything.
          </dd>

          <dt>Are you in cahoots with the energy companies?</dt>

          <dd>
            No, it’s a competitive market and we’re going to fight for the best
            tariff on everyone’s behalf.
          </dd>

          <dt>Are you being paid by the energy companies?</dt>

          <dd>
            We are not paid contractually by them, but we will receive a finders
            fee from the cheapest provider. We’re an independent organisation
            working on behalf of you and your communities.
          </dd>

          <dt>Are you working for the council?</dt>

          <dd>
            We’re not from the council, we’re an independent organisation
            working to make life more affordable for communities like yours.
          </dd>

          <dt>Why this block?</dt>

          <dd>
            We chose your block because we found out that everyone is on
            different providers. We also live round the corner!
          </dd>

          <dt>Will I still have a relationship with the energy provider?</dt>

          <dd>
            Yes, we will organise the cheapest tariff and help you switch.
          </dd>
        </dl>
      </div>
    );
  }
}

export default AboutBlox;
