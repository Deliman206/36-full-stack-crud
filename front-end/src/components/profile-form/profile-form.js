import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils';

const emptyState = {
  bio: '',
};

export default class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.profile ? props.profile : emptyState;
    autoBind.call(this, ProfileForm);
  }
  handleChange(event) {
    const { value } = event.target;
    this.setState({ bio: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onComplete(this.state);
  }

  render() {
    return (
      <form
        className='profile-form'
        onSubmit={this.handleSubmit}
      >
        <textarea
          name='bio'
          value={this.state.bio}
          onChange={this.handleChange}
        />
        <button type='submit'> {this.props.profile ? 'update' : 'create'} profile </button>
      </form>
    );
  }
}

ProfileForm.propTypes = {
  onComplete: PropTypes.func,
  profile: PropTypes.object,
};
