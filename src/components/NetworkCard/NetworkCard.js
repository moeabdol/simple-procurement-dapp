import React, { Component } from 'react';

import Web3 from 'web3';
import _ from 'lodash';

const RPC_URI = process.env.REACT_APP_RPC_URI;

class NetworkCard extends Component {
  constructor(props) {
    super(props);
    this.web3 = new Web3(RPC_URI);
    this.state = {
      networkId: null,
      networkType: null,
      isListening: null,
      peerCount: null,
    };
  }

  componentDidMount() {
    this.loadNetworkData();
  }

  loadNetworkData = async () => {
    try {
      const networkId = await this.web3.eth.net.getId();
      const networkType = await this.web3.eth.net.getNetworkType();
      const isListening = await this.web3.eth.net.isListening();
      const peerCount = await this.web3.eth.net.getPeerCount();
      this.setState({
        networkId,
        networkType: _.capitalize(networkType),
        isListening,
        peerCount,
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { networkId, networkType, isListening, peerCount } = this.state;

    return (
      <div className="card">
        <div className="card-header h5">Network Info</div>
        <div className="card-body">
          <p className="card-text mb-0">
            <b>Network ID:</b> {networkId}
          </p>
          <p className="card-text mb-0">
            <b>Network Type:</b> {networkType}
          </p>
          <p className="card-text mb-0">
            <b>Listening to Peers:</b> {isListening ? 'True' : 'False'}
          </p>
          <p className="card-text">
            <b>Number to Peers:</b> {peerCount}
          </p>
        </div>
      </div>
    );
  }
}

export default NetworkCard;
