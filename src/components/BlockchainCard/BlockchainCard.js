import React, { Component } from 'react';

import Web3 from 'web3';

const RPC_URI = process.env.REACT_APP_RPC_URI;

class BlockchainCard extends Component {
  constructor(props) {
    super(props);
    this.web3 = new Web3(RPC_URI);
    this.state = {
      currentBlock: null,
      accounts: null,
      coinbase: null,
      isMining: null,
      hashRate: null,
      gasPrice: null,
    };
  }

  componentDidMount() {
    this.loadBlockchainData();
  }

  loadBlockchainData = async () => {
    try {
      const currentBlock = await this.web3.eth.getBlockNumber();
      const accounts = await this.web3.eth.getAccounts();
      const coinbase = await this.web3.eth.getCoinbase();
      const isMining = await this.web3.eth.isMining();
      const hashRate = await this.web3.eth.getHashrate();
      const gasPrice = await this.web3.eth.getGasPrice();
      this.setState({
        currentBlock,
        accounts,
        coinbase,
        isMining,
        hashRate,
        gasPrice,
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const {
      currentBlock,
      accounts,
      coinbase,
      isMining,
      hashRate,
      gasPrice,
    } = this.state;

    return (
      <div className="card">
        <div className="card-header h5">Blockchain Info</div>
        <div className="card-body">
          <p className="card-text mb-0">
            <b>Current Block:</b> {currentBlock}
          </p>
          <p className="card-text mb-0">
            <b>Coinbase Address:</b>
            <br />
            <span>{coinbase}</span>
          </p>
          <p className="card-text mb-0">
            <b>Number of Accounts:</b> {accounts && accounts.length}
          </p>
          <p className="card-text mb-0">
            <b>Accounts:</b>
            <br />
            {accounts &&
              accounts.map((account, index) => {
                return (
                  <React.Fragment key={index}>
                    <span>
                      {index + 1}. {account}
                    </span>
                    <br />
                  </React.Fragment>
                );
              })}
          </p>
          <p className="card-text mb-0">
            <b>Mining:</b> {isMining ? 'True' : 'False'}
          </p>
          <p className="card-text mb-0">
            <b>Hash Rate:</b> {hashRate}
          </p>
          <p className="card-text mb-0">
            <b>Gas Price:</b> {gasPrice} Wei/Gas
          </p>
        </div>
      </div>
    );
  }
}

export default BlockchainCard;
