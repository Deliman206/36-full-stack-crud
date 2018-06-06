import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as authActions from '../../actions/auth';

import autoBind from '../../utils';
import AuthForm from '../auth-form/auth-form';

class AuthLanding extends React.Component {
  constructor(props) {
    super(props);
    autoBind.call(this, AuthLanding);
  }

  handleLogin(user) {
    return this.props.pDoLogin(user)
      .then(() => {
        this.props.history.push('/dashboard');
      })
      .catch(console.error);
  }

  handleSignUp(user) {
    return this.props.pDoSignup(user)
      .then(() => {
        this.props.history.push('/dashboard');
      })
      .catch(console.error);
  }

  render() {
    const rootRender = 
    <div>
      <h2> Welcome Library Manager </h2>
      <Link to='/signup'> Sign up</Link>
      <Link to='/login'> Login </Link>
    </div>;

    const signUpRender =
    <div>
      <h2>Sign Up</h2>
      <AuthForm onComplete={this.handleSignUp}/>
      <p> Already have an account? </p>
      <Link to='/login'> Login Here </Link>
    </div>;

    const loginRender =
    <div>
      <h2>Login</h2>
      <AuthForm type='login' onComplete={this.handleLogin}/>
      <p> Need an Account? </p>
      <Link to='/signup'> Sign Up Here </Link>
    </div>;

    const { location } = this.props;

    return (
      <div className='landing'>
        {location.pathname === '/' ? rootRender : undefined }
        {location.pathname === '/signup' ? signUpRender : undefined }
        {location.pathname === '/login' ? loginRender : undefined }
      </div>
    );
  }
}

AuthLanding.propTypes = {
  pDoLogin: PropTypes.func,
  pDoSignup: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  token: state.token,
});

const mapDispatchToProps = dispatch => ({
  pDoSignup: user => dispatch(authActions.signupRequest(user)),
  pDoLogin: user => dispatch(authActions.loginRequest(user)),
});


export default connect(mapStateToProps, mapDispatchToProps)(AuthLanding);
