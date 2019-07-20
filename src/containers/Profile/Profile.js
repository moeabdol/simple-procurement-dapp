import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import accounts from '../../assets/data/data';
import { setDefaultAccount } from '../../store/actions/Navbar/NavbarActions';
import { AccountTypeSpan } from './ProfileStyles';
import CreatePOModal from '../../components/CreatePOModal/CreatePOModal';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { getPOs } from '../../store/actions/Profile/ProfileActions';

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

    this.props.getPOs();
  }

  componentDidUpdate(prevProps) {
    const { defaultAccount } = this.props;

    if (defaultAccount && prevProps.defaultAccount !== defaultAccount) {
      this.props.history.push(`/profile/${defaultAccount.address}`);
    }
  }

  render() {
    const {
      loading,
      createPOLoading,
      getPOsResult,
      defaultAccount,
    } = this.props;

    return (
      <React.Fragment>
        {(loading || createPOLoading) && <LoadingSpinner />}
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
                {getPOsResult && getPOsResult.length > 0 ? (
                  <table className="table">
                    <thead className="thead-dark">
                      <tr>
                        <th>Order Name</th>
                        <th>Status</th>
                        <th>Deadline</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getPOsResult.map((po, index) => {
                        return (
                          <tr key={index}>
                            <td>{po.name}</td>
                            <td>
                              {po.fulfilled ? (
                                <span className="badge badge-success">
                                  Fulfilled
                                </span>
                              ) : (
                                <span className="badge badge-danger">
                                  Not Fulfilled
                                </span>
                              )}
                            </td>
                            <td>{po.rfpDeadline}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div></div>
                )}

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
  loading: PropTypes.bool,
  getPOs: PropTypes.func,
  createPOLoading: PropTypes.bool,
  getPOsResult: PropTypes.array,
};

const mapStateToProps = state => ({
  createPOLoading: state.createPOModalState.loading,
  defaultAccount: state.navbarState.defaultAccount,
  loading: state.profileState.loading,
  getPOsResult: state.profileState.result,
});

const mapDispatchToProps = dispatch => ({
  setDefaultAccount: account => dispatch(setDefaultAccount(account)),
  getPOs: () => dispatch(getPOs()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));
