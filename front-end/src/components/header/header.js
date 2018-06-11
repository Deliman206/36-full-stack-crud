import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as authActions from '../actions/auth';

class Header extends React.Component {
  render() {
    const JSXNotLoggedIn =
      <ul>
        <li><Link to={'/'}> Home </Link></li>
        <li><Link to={'/login'}> Login</Link></li>
        <li><Link to={'/signup'}> Sign Up </Link></li>
    </ul>;
    const JSXLoggedIn =
      <ul>
        <li><Link to={'/dashboard'}> Dashboard </Link></li>
        <li><Link to={'/profile'}> Profile </Link></li>
      </ul>;

    return (
      <header className='header'>
        <h1> Library Manager</h1>
        <nav>
          { this.props.loggedIn ? JSXLoggedIn : JSXNotLoggedIn }
        </nav>
        {
          this.props.loggedIn ?
            <button onClick={this.props.doLogout}>Logout</button>
            : undefined
        }
      </header>
    );
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool,
  doLogout: PropTypes.func,
};

const mapStateToProps = state => ({
  loggedIn: !!state.token,
});


const mapDispatchToProps = dispatch => ({
  doLogout: () => dispatch(authActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
