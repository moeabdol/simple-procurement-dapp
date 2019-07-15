import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import NetworkCard from '../../components/NetworkCard/NetworkCard';
import BlockchainCard from '../../components/BlockchainCard/BlockchainCard';

class Home extends Component {
  render() {
    const { loadingNetworkCardInfo, loadingBlockchainCardInfo } = this.props;

    return (
      <React.Fragment>
        {loadingNetworkCardInfo || loadingBlockchainCardInfo ? (
          <LoadingSpinner />
        ) : null}
        <div className="container">
          <div className="row">
            <div className="col">
              <NetworkCard />
            </div>

            <div className="col">
              <BlockchainCard />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  loadingNetworkCardInfo: PropTypes.bool,
  loadingBlockchainCardInfo: PropTypes.bool,
};

const mapStateToProps = state => ({
  loadingNetworkCardInfo: state.networkCardState.loading,
  loadingBlockchainCardInfo: state.blockchainCardState.loading,
});

export default connect(mapStateToProps)(Home);
