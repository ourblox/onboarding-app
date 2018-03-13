import React, { Component } from 'react';
import logo from './blox.svg';
import CreateHome from './create-home';
import './App.css';

class App extends Component {

  state = {
    buildingName: "Charles Dickens House",
  }

  newHomeAdded = (flatNumber) => {

  }

  render() {
    const { buildingName } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="Blox" />

        </header>

        <CreateHome buildingName={buildingName} homeCreated={this.newHomeAdded} />


      </div>
    );
  }
}

export default App;
