import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileForm from './../profile/profile';
import * as ProfileActions from '../../actions/profile-actions';

class ProfileDashboard extends React.Component {
  componentDidMount() {
    this.props.profileFetch();
  }

  handleCreate(profile) {
    this.props.profileCreate(profile)
      .then(() => {
        this.props.history.push('/dashboard');
      });
  }

  handleUpdate(profile) {
    this.props.profileUpdate(profile);
  }

  render() {
    const { profileCreate, profile } = this.props;
    // can add logic to render different views based on UI edditing props
    // There is EDITTING
    // There is VIEWING
    //
    return (
      <div>
        <h2> {profile.username} </h2>
        <ProfileForm onComplete={profileCreate}/>
      </div>
    );
  }
}

ProfileDashboard.propTypes = {
  profile: PropTypes.object,
  history: PropTypes.object,
  profileFetch: PropTypes.func,
  profileCreate: PropTypes.func,
  profileUpdate: PropTypes.func,
  profileDelete: PropTypes.func,
};

const mapStateTopProps = (state) => {
  return {
    profile: state.profile,
  };
};

const mapDispatchToProps = dispatch => ({
  profileFetch: () => dispatch(ProfileActions.profileFetchRequest()),
  profileCreate: profile => dispatch(ProfileActions.profileCreateRequest(profile)),
  profileUpdate: profile => dispatch(ProfileActions.profileUpdateRequest(profile)),
  profileDelete: profile => dispatch(ProfileActions.profileDeleteRequest(profile)),
  
});

export default connect(mapStateTopProps, mapDispatchToProps)(ProfileDashboard);
