import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default ComposedComponent =>
  class extends Component {
    static propTypes = {
      localDb: PropTypes.object.isRequired,
      buildingSlug: PropTypes.string.isRequired,
      buildingName: PropTypes.string.isRequired
    };

    constructor(props) {
      super();
      this.state = {
        rev: null,
        previousAnswers: {},
        displayFields: true,
        checked: false
      };
    }

    componentDidMount() {
      const buildingName = this.props.buildingName;
      const flatNumber = this.props.flatNumber;
      const buildingNameAsID = buildingName.replace(/\s+/g, '-').toLowerCase();
      const buildingSlug = this.props.buildingSlug;
      const documentId = `${buildingSlug}-${flatNumber}-${buildingNameAsID}`;
      this.props.localDb
        .get(documentId)
        .then(doc => {
          if (doc) {
            this.setState({
              flatAndBuilding: `${flatNumber} ${buildingName}`,
              documentId: documentId,
              previousAnswers: doc,
              checked: true
            });
            if (doc._rev) {
              this.setState({
                rev: doc._rev
              });
            }
          } else {
            this.setState({
              checked: true
            });
          }
        })
        .catch(err => {
          if (err.name === 'not_found') {
            this.setState({
              flatAndBuilding: `${flatNumber} ${buildingName}`,
              documentId: documentId,
              checked: true
            });
          }
          this.setState({
            checked: true
          });
        });
    }

    setHiddenFields = () => {
      this.setState({
        displayFields: false
      });
    };

    updateRev = rev => {
      this.setState({
        rev: rev
      });
    };

    updatePreviousAnswers = () => {
      // This stuff appears in componentDidMount and should be abstracted
      const buildingName = this.props.buildingName;
      const buildingSlug = this.props.buildingSlug;
      const flatNumber = this.props.flatNumber;
      const buildingNameAsID = buildingName.replace(/\s+/g, '-').toLowerCase();
      const documentId = `${buildingSlug}-${flatNumber}-${buildingNameAsID}`;
      this.props.localDb
        .get(documentId)
        .then(doc => {
          if (doc) {
            this.setState({
              previousAnswers: doc,
              displayFields: true,
              checked: true,
              buildingSlug: buildingSlug
            });

            if (doc._rev) {
              this.setState({
                rev: doc._rev
              });
            }
          } else {
            this.setState({
              displayFields: true,
              checked: true,
              buildingSlug: buildingSlug
            });
          }
        })
        .catch(err => this.setState({ checked: true }));
    };

    render() {
      const {
        rev,
        previousAnswers,
        flatAndBuilding,
        documentId,
        displayFields,
        checked
      } = this.state;
      return (
        <div>
          {checked && (
            <ComposedComponent
              {...this.props}
              rev={rev}
              updateRev={this.updateRev}
              previousAnswers={previousAnswers}
              updatePreviousAnswers={this.updatePreviousAnswers}
              flatAndBuilding={flatAndBuilding}
              documentId={documentId}
              displayFields={displayFields}
              setHiddenFields={this.setHiddenFields}
            />
          )}
          {!checked && <p>Loading</p>}
        </div>
      );
    }
  };
