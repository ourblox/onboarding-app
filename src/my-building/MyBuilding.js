import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MyBuilding.css';

class MyBuilding extends Component {
  static propTypes = {
    buildingName: PropTypes.string,
    setBuildingName: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired
  };

  componentDidMount = () => {
    const { setBuildingName } = this.props;
    const urlSlug = this.props.match.params.buildingName;
    if (urlSlug) {
      const buildingSlug = urlSlug;
      setBuildingName(buildingSlug);
    } else {
      setBuildingName(null);
    }
  };

  render() {
    const { buildingName } = this.props;
    return (
      <div className="MyBuilding ContentContainer">
        {buildingName && (
          <div>
            <h2>Blox:Pool at {buildingName} </h2>
            <p>
              Blox Pool enables you to work with your neighbours to demand
              cheaper energy from the suppliers. We expect you to save quite a
              bit of money.{' '}
            </p>
            <p>
              If you received a card, please login using the details on the card
              and input your current energy details. We will handle the rest!
            </p>

            <Link className="BigButton" to="/login">
              Login now
            </Link>
            <p>
              Questions? please <Link to="/blox-faqs">browse our FAQs</Link>{' '}
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default MyBuilding;
