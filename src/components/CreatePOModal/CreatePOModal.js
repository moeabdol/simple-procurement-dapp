import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import accounts from '../../assets/data/data';

class CreatePOModal extends Component {
  state = {
    sellers: [],
  };

  componentDidMount() {
    accounts.forEach(account => (account.selected = false));
    const sellers = accounts.filter(account => account.type === 'seller');
    this.setState({ sellers });
  }

  onSellerClick = seller => {
    const sellers = this.state.sellers.map(s => {
      if (s.address === seller.address) s.selected = !s.selected;
      return s;
    });
    this.setState({ sellers });
  };

  render() {
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
                    value={this.props.defaultAccount.address}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rfp" className="col-form-label">
                    Request for Proposal:
                  </label>
                  <textarea
                    className="form-control"
                    rows="5"
                    id="rfp"></textarea>
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
                      // selected={props.startDate}
                      // onChange={this.handleChange}
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
                    <select id="bidType" className="form-control">
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                </div>
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
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
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
};

const mapStateToProps = state => ({
  defaultAccount: state.navbarState.defaultAccount,
});

export default connect(mapStateToProps)(CreatePOModal);
