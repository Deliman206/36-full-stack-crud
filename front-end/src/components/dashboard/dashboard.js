import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PictureForm from '../picture-form/picture-form';
import * as userProfileActions from '../../actions/profile';
import * as userPictureActions from '../../actions/pictures';

const fileToBase64String = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('File Required'));
    }
    const fileReader = new FileReader();

    fileReader.addEventListener('load', () => resolve(fileReader.result));
    fileReader.addEventListener('error', reject);

    return fileReader.readAsDataURL(file);
  });
};

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.profileFetch();
    this.props.picturesFetch();
  }
  render() {
    return (
      <div>
        <p>Only see me if you are logged in</p>
        <PictureForm onComplete={this.props.pictureCreate}/>
        {this.props.pictures ? 
          <img src={fileToBase64String(this.props.pictures.array[0].url)}/> 
          : null}
      </div>
    );
  }
}

Dashboard.propTypes = {
  profileFetch: PropTypes.func,
  pictureCreate: PropTypes.func,
  picturesFetch: PropTypes.func,
  pictures: PropTypes.array,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  picturesFetch: pictures => dispatch(userPictureActions.getRequest(pictures)),
  profileFetch: profile => dispatch(userProfileActions.getRequest(profile)),
  pictureCreate: picture => dispatch(userPictureActions.createRequest(picture)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
