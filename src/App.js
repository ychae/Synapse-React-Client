import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as SynapseClient from './lib/components/SynapseClient.js';
import * as SynapseConstants from './lib/components/SynapseConstants.js';

class App extends Component {
  state = {}

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Synapse React Client Demo</h2>
        </div>
        <p className="App-intro">
          Synapse production version: {this.state.version}
        </p>
      </div>
    );
  }

  componentDidMount() {
    // IMPORTANT: Your component should have a property (with default) to change the endpoint.  This is necessary for Synapse.org integration.
    // Pass your endpoint through to the rpc call:
    // SynapseClient.getVersion('https://repo-staging.prod.sagebase.org')
    SynapseClient.getVersion()
      .then(data => this.setState(data))
      .catch(function (error) {
        // Handle HTTPError.  Has statusCode and message.
        console.error(error)
      });

    // Example table (view) query
    let QUERY = {
      entityId: "syn12335586",
      query: {
        sql: "SELECT * FROM syn12335586",
        includeEntityEtag: true,
        isConsistent: true,
        offset: 0,
        limit: 100
      },

      partMask: SynapseConstants.BUNDLE_MASK_QUERY_RESULTS
        | SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS
        | SynapseConstants.BUNDLE_MASK_QUERY_SELECT_COLUMNS
        | SynapseConstants.BUNDLE_MASK_QUERY_FACETS
    };
    SynapseClient.getQueryTableResults(QUERY)
      .then(data => console.log(data))
      .catch(function (error) {
        console.error(error)
      });
  }
}

export default App;