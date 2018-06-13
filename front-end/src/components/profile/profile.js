import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as userProfileActions from '../../actions/profile';
import autoBind from '../../utils';
import ProfileForm from '../profile-form/profile-form';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editting: false,
    };
    autoBind.call(this, Profile);
  }

  handleCreate(profile) {
    this.props.profileCreate(profile)
      .then(() => {
        this.props.history.push('/dashboard');
      });
  }

  handleUpdate(profile) {
    this.props.profileUpdate(profile);
    this.setState({ editting: false });
  }

  render() {
    const { profile } = this.props;
    let renderEditting = null;
    let renderDisplay = null;
    let renderProfile = null;
    
    if (profile) {
      renderEditting = 
        <div>
          <ProfileForm profile={profile} onComplete={this.handleUpdate}/>
          <button onClick={() => this.setState({ editting: false })}>Cancel</button>
        </div>;

      renderDisplay = 
        <div>
          <p> { profile.bio } </p>
          <button onClick={() => this.setState({ editting: true })}>Edit</button>
        </div>;

      renderProfile = 
        <div>
          <h2> { profile.username } </h2>
          <h3> { profile.email } </h3>
          {this.state.editting ? renderEditting : renderDisplay}
        </div>;
    }

    return (
      <div>
        <h1>Profile</h1>
        {profile ? renderProfile : <ProfileForm onComplete={this.handleCreate}/>}
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object,
  profileFetch: PropTypes.func,
  profileCreate: PropTypes.func,
  profileUpdate: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  profileFetch: profile => dispatch(userProfileActions.getRequest(profile)),
  profileCreate: profile => dispatch(userProfileActions.createRequest(profile)),
  profileUpdate: profile => dispatch(userProfileActions.updateRequest(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
