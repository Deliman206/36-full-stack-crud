import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PictureForm from '../picture-form/picture-form';
import * as userProfileActions from '../../actions/profile';
import * as userPictureActions from '../../actions/pictures';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.profileFetch();
  }
  render() {
    return (
      <div>
        <p>Only see me if you are logged in</p>
        <PictureForm onComplete={this.props.pictureCreate}/>
      </div>
    );
  }
}

Dashboard.propTypes = {
  profileFetch: PropTypes.func,
  pictureCreate: PropTypes.func,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  profileFetch: profile => dispatch(userProfileActions.getRequest(profile)),
  pictureCreate: picture => dispatch(userPictureActions.createRequest(picture)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
