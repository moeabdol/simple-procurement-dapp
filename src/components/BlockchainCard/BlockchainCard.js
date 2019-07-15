import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getBlockchainInfo } from '../../store/actions/BlockchainCard/BlockchainCardActions';

class BlockchainCard extends Component {
  componentDidMount() {
    this.props.getBlockchainInfo();
  }

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

BlockchainCard.propTypes = {
  getBlockchainInfo: PropTypes.func,
  currentBlock: PropTypes.number,
  accounts: PropTypes.array,
  coinbase: PropTypes.string,
  isMining: PropTypes.bool,
  hashRate: PropTypes.number,
  gasPrice: PropTypes.string,
};

const mapStateToProps = state => ({
  loading: state.blockchainCardState.loading,
  currentBlock: state.blockchainCardState.currentBlock,
  accounts: state.blockchainCardState.accounts,
  coinbase: state.blockchainCardState.coinbase,
  isMining: state.blockchainCardState.isMining,
  hashPrice: state.blockchainCardState.hashPrice,
  gasPrice: state.blockchainCardState.gasPrice,
  error: state.blockchainCardState.error,
});

const mapDispatchToProps = dispatch => ({
  getBlockchainInfo: () => dispatch(getBlockchainInfo()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlockchainCard);
