import React, { Component } from 'react';

export default ComposedComponent =>
  class extends Component {
    constructor(props) {
      super();
      this.state = {
        rev: null,
        previousAnswers: {}
      };
    }

    updateRev = rev => {
      console.log('updating rev', rev);
      this.setState({
        rev: rev
      });
    };

    componentDidMount() {
      const buildingName = this.props.buildingName;
      const flatNumber = this.props.flatNumber;
      const buildingNameAsID = buildingName.replace(/\s+/g, '-').toLowerCase();
      const documentId = `${flatNumber}-${buildingNameAsID}`;

      this.props.db
        .get(documentId)
        .then(doc => {
          if (doc) {
            this.setState({
              flatNumber: flatNumber,
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
              flatNumber: flatNumber,
              flatAndBuilding: `${flatNumber} ${buildingName}`,
              documentId: documentId,
              checked: true
            });
          }
        });
    }
    render() {
      console.log(this.state);
      const {
        previousAnswers,
        flatAndBuilding,
        documentId,
        rev,
        checked
      } = this.state;
      return (
        <ComposedComponent
          checked={checked}
          updateRev={this.updateRev}
          rev={rev}
          previousAnswers={previousAnswers}
          flatAndBuilding={flatAndBuilding}
          documentId={documentId}
          db={this.props.db}
        />
      );
    }
  };
