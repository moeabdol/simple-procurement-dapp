import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import accounts from '../../assets/data/data';
import { setDefaultAccount } from '../../store/actions/Navbar/NavbarActions';
import { AccountTypeSpan } from './ProfileStyles';
import CreatePOModal from '../../components/CreatePOModal/CreatePOModal';
import CreateProposalModal from '../../components/CreateProposalModal/CreateProposalModal';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import {
  getBuyerPOs,
  getSellerPOs,
} from '../../store/actions/Profile/ProfileActions';

class Profile extends Component {
  componentDidMount() {
    const address = this.props.match.params.address;
    const { defaultAccount } = this.props;

    if (!defaultAccount) {
      const account = accounts.filter(
        account => account.address === address
      )[0];
      this.props.setDefaultAccount(account);

      if (account.type === 'buyer') {
        this.props.getBuyerPOs(account.address);
      } else if (account.type === 'seller') {
        this.props.getSellerPOs(account.address);
      }
    }

    if (defaultAccount && defaultAccount.type === 'buyer') {
      this.props.getBuyerPOs(defaultAccount.address);
    } else if (defaultAccount && defaultAccount.type === 'seller') {
      this.props.getSellerPOs(defaultAccount.address);
    }
  }

  componentDidUpdate(prevProps) {
    const { defaultAccount, modalPOResult } = this.props;

    if (defaultAccount && prevProps.defaultAccount !== defaultAccount) {
      this.props.history.push(`/profile/${defaultAccount.address}`);
      if (defaultAccount.type === 'buyer') {
        this.props.getBuyerPOs(defaultAccount.address);
      } else if (defaultAccount.type === 'seller') {
        this.props.getSellerPOs(defaultAccount.address);
      }
    }

    if (modalPOResult && prevProps.modalPOResult !== modalPOResult) {
      if (defaultAccount.type === 'buyer') {
        this.props.getBuyerPOs(defaultAccount.address);
      } else if (defaultAccount.type === 'seller') {
        this.props.getSellerPOs(defaultAccount.address);
      }
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

            {getPOsResult && getPOsResult.length > 0 ? (
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th>Order Name</th>
                    <th>Status</th>
                    <th>Deadline</th>
                    {defaultAccount.type === 'seller' && <th>Actions</th>}
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
                        {defaultAccount.type === 'seller' && !po.fulfilled && (
                          <td>
                            <button
                              className="btn btn-sm btn-success"
                              data-toggle="modal"
                              data-target={`#proposalModal${po.id}`}>
                              Respond
                            </button>
                            <CreateProposalModal
                              id={`proposalModal${po.id}`}
                              orderId={po.id}
                              orderName={po.name}
                            />
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="h5 text-center m-5">No Orders!</div>
            )}

            {defaultAccount.type === 'buyer' && (
              <React.Fragment>
                <button
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#poModal">
                  Create Order
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
  getBuyerPOs: PropTypes.func,
  createPOLoading: PropTypes.bool,
  getPOsResult: PropTypes.array,
  modalPOResult: PropTypes.object,
  getSellerPOs: PropTypes.func,
};

const mapStateToProps = state => ({
  createPOLoading: state.createPOModalState.loading,
  defaultAccount: state.navbarState.defaultAccount,
  loading: state.profileState.loading,
  getPOsResult: state.profileState.result,
  modalPOResult: state.createPOModalState.result,
});

const mapDispatchToProps = dispatch => ({
  setDefaultAccount: account => dispatch(setDefaultAccount(account)),
  getBuyerPOs: buyerAddress => dispatch(getBuyerPOs(buyerAddress)),
  getSellerPOs: sellerAddress => dispatch(getSellerPOs(sellerAddress)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));
