import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getNetworkInfo } from '../../store/actions/NetworkCard/NetworkCardActions';

class NetworkCard extends Component {
  componentDidMount() {
    this.props.getNetworkInfo();
  }

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
  getNetworkInfo: PropTypes.func,
};

const mapStateToProps = state => ({
  loading: state.networkCardState.loading,
  networkId: state.networkCardState.networkId,
  networkType: state.networkCardState.networkType,
  isListening: state.networkCardState.isListening,
  peerCount: state.networkCardState.peerCount,
  error: state.networkCardState.error,
});

const mapDispatchToProps = dispatch => ({
  getNetworkInfo: () => dispatch(getNetworkInfo()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NetworkCard);
