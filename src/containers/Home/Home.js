import React, { Component } from 'react';

import NetworkCard from '../../components/NetworkCard/NetworkCard';
import BlockchainCard from '../../components/BlockchainCard/BlockchainCard';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            <NetworkCard />
          </div>

          <div className="col-6">
            <BlockchainCard />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
