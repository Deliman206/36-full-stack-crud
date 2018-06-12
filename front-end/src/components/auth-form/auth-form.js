import React from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
// import superagent from 'superagent';
import autoBind from '../../utils/index';

const emptyState = {
  username: '',
  usernameDirty: false,
  usernameError: 'Username is invalid',
  // username is already taken

  email: '',
  emailDirty: false,
  emailError: 'Valid Email is required',


  password: '',
  passwordDirty: false,
  passwordError: 'Password must be at between 6-10 characters',
};

const MIN_NAME_LENGTH = 4;
const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 10;

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = emptyState;
    autoBind.call(this, AuthForm);
  }
  // handleValidation(event) {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [`${name}Error`]: this._handleValidation(name, value),
  //   });
  // }
  handleValidation(name, value) {
    if (this.props.type === 'login') {
      return null;
    }
    switch (name) {
      case 'username':
        // superagent.get(`${API_URL}/usernames/all`)
        //   .then((usernames) => {
        //     if (usernames.includes(value)) {
        //       return 'This username has been taken';
        //     }
        //     return null;
        //   });
        if (value.length < MIN_NAME_LENGTH) {
          return 'This username is not at least 4 characters long';
        }
        return null;
      case 'email':
        if (!validator.isEmail(value)) {
          return 'You must provide a valid email';
        }
        return null;
      case 'password':
        if (value.length < MIN_PASSWORD_LENGTH || value.length > MAX_PASSWORD_LENGTH) {
          return `Your password must between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters long`;
        }
        return null;
      default:
        return null;
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ 
      [name]: value,
      [`${name}Dirty`]: true,
      [`${name}Error`]: this.handleValidation(name, value),
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { usernameError, emailError, passwordError } = this.state;

    if (this.props.type === 'login' || (!usernameError && !passwordError && !emailError)) {
      this.props.onComplete(this.state);
      this.setState(emptyState);
    } else {
      this.setState({
        usernameDirty: true,
        emailDirty: true,
        passwordDirty: true,
      });
    }
  }
  render() {
    let { type } = this.props;

    type = type === 'login' ? type : 'signup';

    const signupJSX =
      <div>
        { this.state.emailDirty ? <p>{ this.state.emailError }</p> : undefined }
      <input
        name='email'
        placeholder='email'
        type='email'
        value={this.state.email}
        onChange={this.handleChange}
        // onBlur={this.handleValidation}
        />
      </div>;

    const signupRenderedJSX = (type !== 'login') ? signupJSX : undefined;

    return (
      <form className='auth-form' noValidate onSubmit={this.handleSubmit} >

        { this.state.usernameDirty ? <p>{ this.state.usernameError} </p> : undefined }
        <input
          name='username'
          placeholder='username'
          type='text'
          value={this.state.username}
          onChange={this.handleChange}
          />

        {signupRenderedJSX}

        { this.state.passwordDirty ? <p>{ this.state.passwordError} </p> : undefined }
        <input
          className={ this.state.passwordDirty ? 'input-error' : ''}
          name='password'
          placeholder='password'
          type='password'
          value={this.state.password}
          onChange={this.handleChange}
          />

        <button type='submit'> {type} </button>
      </form>
    );
  }
} 

AuthForm.propTypes = {
  type: PropTypes.string,
  onComplete: PropTypes.func,
};

export default AuthForm;
