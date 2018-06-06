import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class AuthRedirect extends React.Component {
  render() {
    const { location, token } = this.props;
    const { pathname } = location;

    let destinationRoute = null;

    if (pathname === '/login' || pathname === '/signup' || pathname === '/') {
      if (token) {
        destinationRoute = '/dashboard';
      }
    } else if (!token) {
      destinationRoute = '/';
    }
    return (
      <div>
      { destinationRoute ? <Redirect to={destinationRoute}/> : undefined}
      </div>
    );
  }
}

AuthRedirect.propTypes = {
  token: PropTypes.string,
  location: PropTypes.object,
};

const mapStateToProps = state => ({
  token: state.token,
});

export default connect(mapStateToProps)(AuthRedirect);
