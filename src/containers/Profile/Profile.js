import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import accounts from '../../assets/data/data';
import { setDefaultAccount } from '../../store/actions/Navbar/NavbarActions';
import { AccountTypeSpan } from './ProfileStyles';

class Profile extends Component {
  componentDidMount() {
    const address = this.props.match.params.address;
    const { defaultAccount } = this.props;

    if (!defaultAccount) {
      const account = accounts.filter(
        account => account.address === address
      )[0];
      this.props.setDefaultAccount(account);
    }
  }

  componentDidUpdate(prevProps) {
    const { defaultAccount } = this.props;

    if (defaultAccount && prevProps.defaultAccount !== defaultAccount) {
      this.props.history.push(`/profile/${defaultAccount.address}`);
    }
  }

  onCreatePurchaseOrderClick = () => {
    console.log('clicked po');
  };

  render() {
    const { defaultAccount } = this.props;

    return (
      <React.Fragment>
        {defaultAccount && (
          <div className="container">
            <div className="h3">
              {defaultAccount.name}{' '}
              <AccountTypeSpan type={defaultAccount.type}>
                ({_.capitalize(defaultAccount.type)})
              </AccountTypeSpan>
            </div>

            {defaultAccount.type === 'buyer' && (
              <button
                className="btn btn-primary"
                onClick={this.onCreatePurchaseOrderClick}>
                Create Purchase Order
              </button>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

Profile.propTypes = {
  defaultAccount: PropTypes.object,
  match: PropTypes.object,
  setDefaultAccount: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  defaultAccount: state.navbarState.defaultAccount,
});

const mapDispatchToProps = dispatch => ({
  setDefaultAccount: account => dispatch(setDefaultAccount(account)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));
