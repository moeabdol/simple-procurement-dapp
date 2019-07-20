import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';

import accounts from '../../assets/data/data';
import {
  onRfpChange,
  onRfpDeadlineChange,
  onBidTypeChange,
  onSellersAddressesChange,
  sendPO,
  clearPO,
} from '../../store/actions/CreatePOModal/CreatePOModalActions';

accounts.forEach(account => (account.selected = false));
const sellers = accounts.filter(account => account.type === 'seller');

class CreatePOModal extends Component {
  state = {
    sellers,
  };

  async componentDidUpdate(prevProps) {
    const { result, error } = this.props;
    if (result && prevProps.result !== result) {
      await Swal.fire({
        type: 'success',
        title: 'Order Created Successfuly!',
        width: '750px',
        html: `
          <small class="float-left"><b>Sender Address:</b>&nbsp;${result.from}</small><br />
          <small class="float-left"><b>Reciever Address:</b>&nbsp;${result.to}</small><br />
          <small class="float-left"><b>Transaction Hash:</b>&nbsp;${result.transactionHash}</small><br />
          <small class="float-left"><b>Block Number:</b>&nbsp;${result.blockNumber}</small><br />
          <small class="float-left"><b>Block Hash:</b>&nbsp;${result.blockHash}</small><br />
          <small class="float-left"><b>Gas Used:</b>&nbsp;${result.gasUsed}</small>
        `,
      });
      this.props.clearPO();
    }

    if (error && prevProps.error !== error) {
      Swal.fire({
        type: 'error',
        title: 'Something went wrong!',
        text: error,
      });
    }
  }

  onSellerClick = seller => {
    const sellers = [...this.state.sellers];
    sellers.forEach(s =>
      s.address === seller.address ? (s.selected = !s.selected) : null
    );
    this.setState({ sellers }, () =>
      this.props.onSellersAddressesChange(sellers)
    );
  };

  submitCreatePO = e => {
    e.preventDefault();
    const {
      defaultAccount,
      rfp,
      rfpDeadline,
      bidType,
      sellersAddresses,
    } = this.props;
    this.props.sendPO(
      defaultAccount.address,
      rfp,
      rfpDeadline,
      bidType,
      sellersAddresses
    );
  };

  render() {
    const {
      defaultAccount,
      rfp,
      rfpDeadline,
      bidType,
      sellersAddresses,
      onRfpChange,
      onRfpDeadlineChange,
      onBidTypeChange,
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
                Create Order
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
                  <label htmlFor="buyerAddress" className="col-form-label">
                    Buyer Address:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="buyerAddress"
                    disabled
                    value={defaultAccount.address}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rfp" className="col-form-label">
                    Request for Proposal:
                  </label>
                  <textarea
                    className="form-control"
                    rows="5"
                    id="rfp"
                    value={rfp}
                    onChange={e => onRfpChange(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-6">
                    <label htmlFor="rfpDeadline" className="col-form-label">
                      RFP Deadline:
                    </label>
                    <br />
                    <DatePicker
                      id="rfpDeadline"
                      className="form-control"
                      selected={new Date(rfpDeadline)}
                      onChange={datetime => onRfpDeadlineChange(datetime)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={60}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      timeCaption="Time"
                    />
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="bidType" className="col-form-label">
                      Bid Type:
                    </label>
                    <select
                      id="bidType"
                      className="form-control"
                      value={bidType}
                      onChange={e => onBidTypeChange(e.target.value)}>
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                </div>
                {bidType === 'private' && (
                  <ul className="list-group">
                    <label className="col-form-label">Choose Bidders:</label>
                    {this.state.sellers.map((seller, index) => {
                      return (
                        <li
                          className={`list-group-item list-group-item-action ${
                            seller.selected ? 'active' : ''
                          }`}
                          key={index}
                          onClick={() => this.onSellerClick(seller)}>
                          <span className="float-left">{seller.name}</span>
                          <span className="float-right">{seller.address}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                disabled={
                  defaultAccount.address === '' ||
                  rfp === '' ||
                  (bidType === 'private' && sellersAddresses.length === 0)
                }
                onClick={this.submitCreatePO}>
                Send Order
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

CreatePOModal.propTypes = {
  id: PropTypes.string,
  defaultAccount: PropTypes.object,
  rfp: PropTypes.string,
  rfpDeadline: PropTypes.instanceOf(Date),
  bidType: PropTypes.string,
  sellersAddresses: PropTypes.array,
  onRfpChange: PropTypes.func,
  onRfpDeadlineChange: PropTypes.func,
  onBidTypeChange: PropTypes.func,
  onSellersAddressesChange: PropTypes.func,
  sendPO: PropTypes.func,
  loading: PropTypes.bool,
  result: PropTypes.object,
  error: PropTypes.object,
  clearPO: PropTypes.func,
};

const mapStateToProps = state => ({
  defaultAccount: state.navbarState.defaultAccount,
  rfp: state.createPOModalState.rfp,
  rfpDeadline: state.createPOModalState.rfpDeadline,
  bidType: state.createPOModalState.bidType,
  sellersAddresses: state.createPOModalState.sellersAddresses,
  loading: state.createPOModalState.loading,
  result: state.createPOModalState.result,
  error: state.createPOModalState.error,
});

const mapDispatchToProps = dispatch => ({
  onRfpChange: rfp => dispatch(onRfpChange(rfp)),
  onRfpDeadlineChange: rfpDeadline =>
    dispatch(onRfpDeadlineChange(rfpDeadline)),
  onBidTypeChange: bidType => dispatch(onBidTypeChange(bidType)),
  onSellersAddressesChange: sellers =>
    dispatch(onSellersAddressesChange(sellers)),
  sendPO: (buyerAddress, rfp, rfpDeadline, bidType, sellersAddresses) =>
    dispatch(sendPO(buyerAddress, rfp, rfpDeadline, bidType, sellersAddresses)),
  clearPO: () => dispatch(clearPO()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePOModal);
