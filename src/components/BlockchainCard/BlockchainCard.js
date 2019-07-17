import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class BlockchainCard extends Component {
  render() {
    const {
      currentBlock,
      accounts,
      coinbase,
      isMining,
      hashRate,
      gasPrice,
    } = this.props;

    return (
      <div className="card">
        <div className="card-header h5">Blockchain Info</div>
        <div className="card-body">
          <p className="card-text mb-0">
            <b>Current Block:</b> {currentBlock}
          </p>
          <p className="card-text mb-0">
            <b>Coinbase Address:</b> {coinbase}
          </p>
          <p className="card-text mb-0">
            <b>Number of Accounts:</b> {accounts && accounts.length}
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

BlockchainCard.propTypes = {
  currentBlock: PropTypes.number,
  accounts: PropTypes.array,
  coinbase: PropTypes.string,
  isMining: PropTypes.bool,
  hashRate: PropTypes.number,
  gasPrice: PropTypes.string,
};

const mapStateToProps = state => ({
  loading: state.homeState.loading,
  currentBlock: state.homeState.currentBlock,
  accounts: state.homeState.accounts,
  coinbase: state.homeState.coinbase,
  isMining: state.homeState.isMining,
  hashRate: state.homeState.hashRate,
  gasPrice: state.homeState.gasPrice,
});

export default connect(mapStateToProps)(BlockchainCard);
