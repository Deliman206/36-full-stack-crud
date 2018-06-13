import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as userProfileActions from '../../actions/profile';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.profileFetch();
  }
  render() {
    return (
      <div>
        <p>Only see me if you are logged in</p>
      </div>
    );
  }
}

Dashboard.propTypes = {
  profileFetch: PropTypes.func,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  profileFetch: profile => dispatch(userProfileActions.getRequest(profile)),
  profileCreate: profile => dispatch(userProfileActions.createRequest(profile)),
  profileUpdate: profile => dispatch(userProfileActions.updateRequest(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
