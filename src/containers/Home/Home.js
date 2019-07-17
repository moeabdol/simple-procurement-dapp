import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import NetworkCard from '../../components/NetworkCard/NetworkCard';
import BlockchainCard from '../../components/BlockchainCard/BlockchainCard';

import {
  getNetworkInfo,
  getBlockchainInfo,
} from '../../store/actions/Home/HomeActions';

class Home extends Component {
  componentDidMount() {
    this.props.getNetworkInfo();
    this.props.getBlockchainInfo();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.loading && <LoadingSpinner />}
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
  loading: PropTypes.bool,
  getNetworkInfo: PropTypes.func,
  getBlockchainInfo: PropTypes.func,
};

const mapStateToProps = state => ({
  loading: state.homeState.loading,
});

const mapDispatchToProps = dispatch => ({
  getNetworkInfo: () => dispatch(getNetworkInfo()),
  getBlockchainInfo: () => dispatch(getBlockchainInfo()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
