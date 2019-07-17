import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import accounts from '../../assets/data/data';
import { setDefaultAccount } from '../../store/actions/Navbar/NavbarActions';
import { AccountTypeSpan } from './ProfileStyles';
import CreatePOModal from '../../components/CreatePOModal/CreatePOModal';

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
            <div className="h6 text-muted">
              Address: {defaultAccount.address}
            </div>

            {defaultAccount.type === 'buyer' && (
              <React.Fragment>
                <button
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#poModal">
                  Create Purchase Order
                </button>
                <CreatePOModal id="poModal" />
              </React.Fragment>
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
