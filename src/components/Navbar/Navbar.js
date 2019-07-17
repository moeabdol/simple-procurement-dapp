import React, { Component } from 'react';

import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import accounts from '../../assets/data/data';
import { setDefaultAccount } from '../../store/actions/Navbar/NavbarActions';
import { AccountTypeSpan } from './NavbarStyles';

class Navbar extends Component {
  componentDidMount() {
    const { defaultAccount } = this.props;
    if (!defaultAccount) {
      this.props.setDefaultAccount(accounts[0]);
    }
  }

  onAccountChange = account => this.props.setDefaultAccount(account);

  render() {
    const { defaultAccount } = this.props;
    const buyers = accounts.filter(account => account.type === 'buyer');
    const sellers = accounts.filter(account => account.type === 'seller');

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <Link to="/" className="navbar-brand">
          PM dApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink exact to="/" className="nav-link">
                Home
              </NavLink>
            </li>
          </ul>

          {defaultAccount && (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown active">
                <Link
                  to=""
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  <span>{defaultAccount.name}</span>
                  <AccountTypeSpan type={defaultAccount.type}>
                    &nbsp;({_.capitalize(defaultAccount.type)})
                  </AccountTypeSpan>
                </Link>
                <div className="dropdown-menu dropdown-menu-right">
                  <Link
                    to={`/profile/${defaultAccount.address}`}
                    className="dropdown-item">
                    Profile
                  </Link>

                  <div className="dropdown-divider"></div>
                  <AccountTypeSpan className="h6 dropdown-header" type="buyer">
                    Buyers
                  </AccountTypeSpan>
                  {buyers.map((buyer, index) => {
                    return (
                      <Link
                        to="#"
                        key={index}
                        className={`dropdown-item ${defaultAccount &&
                          defaultAccount.address === buyer.address &&
                          'active'}`}
                        onClick={() => this.onAccountChange(buyer)}>
                        {buyer.name}
                      </Link>
                    );
                  })}

                  <div className="dropdown-divider"></div>
                  <AccountTypeSpan className="h6 dropdown-header" type="seller">
                    Sellers
                  </AccountTypeSpan>
                  {sellers.map((seller, index) => {
                    return (
                      <Link
                        to="#"
                        key={index}
                        className={`dropdown-item ${defaultAccount &&
                          defaultAccount.address === seller.address &&
                          'active'}`}
                        onClick={() => this.onAccountChange(seller)}>
                        {seller.name}
                      </Link>
                    );
                  })}
                </div>
              </li>
            </ul>
          )}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  defaultAccount: PropTypes.object,
  setDefaultAccount: PropTypes.func,
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
)(Navbar);
