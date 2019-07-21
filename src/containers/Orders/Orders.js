import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPOs } from '../../store/actions/Orders/OrdersActions';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

class Orders extends Component {
  componentDidMount() {
    this.props.getPOs();
  }

  render() {
    const { loading, result } = this.props;
    return (
      <div className="container">
        {loading && <LoadingSpinner />}
        <div className="h3">Orders</div>

        {result && result.length > 0 ? (
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th>Order Name</th>
                <th>Status</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {result.map((po, index) => {
                return (
                  <tr key={index}>
                    <td>{po.name}</td>
                    <td>
                      {po.fulfilled ? (
                        <span className="badge badge-success">Fulfilled</span>
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
          <div className="h5 text-center m-5">No Orders!</div>
        )}
      </div>
    );
  }
}

Orders.propTypes = {
  getPOs: PropTypes.func,
  loading: PropTypes.bool,
  result: PropTypes.array,
};

const mapStateToProps = state => ({
  loading: state.ordersState.loading,
  result: state.ordersState.result,
  error: state.ordersState.error,
});

const mapDispatchToProps = dispatch => ({
  getPOs: () => dispatch(getPOs()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
