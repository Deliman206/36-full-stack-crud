import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils/index';

const emptyState = {
  username: '',
  email: '',
  password: '',
};

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = emptyState;
    autoBind.call(this, AuthForm);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmite(event) {
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState(emptyState);
  }

  render() {
    let { type } = this.props;

    type = type === 'login' ? type : 'signup';

    const signupRender =
      <input
        name='email'
        placeholder='email'
        type='email'
        value={this.state.email}
        onChange={this.handleChange}
      />;

    const signupRendered = (type !== 'login') ? signupRender : undefined;

    return (
      <form className='auth-form' onSubmit={this.handleSubmit}>
        <input
          name='username'
          placeholder='username'
          type='username'
          value={this.state.username}
          onChange={this.handleChange}
        />
        {signupRendered}
        <input
          name='password'
          placeholder='password'
          type='password'
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button type='submit'>{type}</button>
      </form>
    );
  }
} 

AuthForm.propTypes = {
  type: PropTypes.string,
  onComplete: PropTypes.func,
};

export default AuthForm;
