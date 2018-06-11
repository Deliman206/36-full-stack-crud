import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils';

const emptyState = {
  title: '',
  bio: '',
};

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.profile ? props.profile : emptyState;
    autoBind.call(this, ProfileForm);
  }
  //---------------------------------------------------------------
  // Member Functions
  //---------------------------------------------------------------
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onComplete(this.state);
  }
  //---------------------------------------------------------------
  // Hooks
  //---------------------------------------------------------------
  render() {
    return (
      <form
        className='profile-form'
        onSubmit={this.handleSubmit}>
        <input 
          name='title'
          value={this.state.title}
          onChange={this.handleChange}
        />
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

export default ProfileForm;
