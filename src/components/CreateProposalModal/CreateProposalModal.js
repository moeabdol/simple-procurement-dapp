import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  onProposalChange,
  sendProposal,
} from '../../store/actions/CreateProposalModal/CreateProposalModalActions';

class CreateProposalModal extends Component {
  componentDidUpdate(prevProps) {
    const { result, error } = this.props;

    if (result && prevProps.result !== result) {
      console.log(result);
    }

    if (error && prevProps.error !== error) {
      console.log(error);
    }
  }

  submitProposal = (e, poId, proposal) => {
    e.preventDefault();
    this.props.sendProposal(this.props.defaultAccount.address, poId, proposal);
  };

  render() {
    const {
      defaultAccount,
      orderId,
      orderName,
      proposal,
      onProposalChange,
    } = this.props;

    return (
      <div
        className="modal fade"
        id={this.props.id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Proposal
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="orderId" className="col-form-label">
                    Order ID:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="orderId"
                    disabled
                    value={orderId}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="orderName" className="col-form-label">
                    Order Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="orderName"
                    disabled
                    value={orderName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="proposal" className="col-form-label">
                    Proposal:
                  </label>
                  <textarea
                    className="form-control"
                    rows="5"
                    id="proposal"
                    value={proposal}
                    onChange={e => onProposalChange(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                disabled={defaultAccount.address === '' || proposal === ''}
                onClick={e => this.submitProposal(e, orderId, proposal)}>
                Send Proposal
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProposalModal.propTypes = {
  id: PropTypes.string,
  orderName: PropTypes.string,
  proposal: PropTypes.string,
  onProposalChange: PropTypes.func,
  defaultAccount: PropTypes.object,
  orderId: PropTypes.string,
  sendProposal: PropTypes.func,
  result: PropTypes.object,
  error: PropTypes.object,
};

const mapStateToProps = state => ({
  defaultAccount: state.navbarState.defaultAccount,
  proposal: state.createProposalModalState.proposal,
  loading: state.createProposalModalState.loading,
  result: state.createProposalModalState.result,
  error: state.createProposalModalState.error,
});

const mapDispatchToProps = dispatch => ({
  onProposalChange: proposal => dispatch(onProposalChange(proposal)),
  sendProposal: (seller, poId, proposal) =>
    dispatch(sendProposal(seller, poId, proposal)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProposalModal);
