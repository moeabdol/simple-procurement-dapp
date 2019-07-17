import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class NetworkCard extends Component {
  render() {
    const { networkId, networkType, isListening, peerCount } = this.props;

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

NetworkCard.propTypes = {
  loading: PropTypes.bool,
  networkId: PropTypes.number,
  networkType: PropTypes.string,
  isListening: PropTypes.bool,
  peerCount: PropTypes.number,
};

const mapStateToProps = state => ({
  loading: state.homeState.loading,
  networkId: state.homeState.networkId,
  networkType: state.homeState.networkType,
  isListening: state.homeState.isListening,
  peerCount: state.homeState.peerCount,
  error: state.homeState.error,
});

export default connect(mapStateToProps)(NetworkCard);
