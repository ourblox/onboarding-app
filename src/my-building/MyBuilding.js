import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MyBuilding.css';

class MyBuilding extends Component {
  componentDidMount = () => {
    this.setBuildingName();
  };

  setBuildingName = () => {
    if (this.props.match.params.buildingName) {
      const buildingSlug = this.props.match.params.buildingName;
      this.props.setBuildingName(buildingSlug);
    } else {
      this.props.setBuildingName(null);
    }
  };

  render() {
    const { buildingName } = this.props;
    return (
      <div className="MyBuilding ContentContainer">
        <p>
          Hello. We’re aiming to get everyone in {buildingName} onto the same
          energy provider. We’re doing this to save everyone money.
        </p>
        <p>
          Blox Pool enables you to work with your neighbours to demand cheaper
          energy from the suppliers. Our app helps you organise and we will
          handle the switching. We expect you to save quite a bit of money.{' '}
        </p>
        <p>
          If you received a card, please login using the details on the card and
          input your current energy details. We will handle the rest!
        </p>

        <Link className="BigButton MyBuilding-CTA" to="/login">
          Login now
        </Link>
        <p>
          Questions? please <Link to="/blox-faqs">browse our FAQs</Link>{' '}
        </p>
      </div>
    );
  }
}

export default MyBuilding;
