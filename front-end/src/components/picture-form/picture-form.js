import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils';

const emptyState = {
  preview: '',
  picture: '',
  description: '',
};

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

export default class PictureForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = emptyState;
    autoBind.call(this, PictureForm);
  }

  handleChange(event) {
    const { type, value, files } = event.target;
    if (type === 'file') {
      fileToBase64String(files[0])
        .then(preview => this.setState({ preview }));
      this.setState({
        picture: files[0],
      }, () => {
        console.log('State Change');
      });
    } else {
      this.setState({
        description: value,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState(emptyState);
  }

  render() {
    return (
      <form
        className='pictureForm'
        onSubmit={this.handleSubmit}>
        <img src={this.state.preview}/>
        <label>Photo</label>
        <input
          type='file'
          name='photo'
          onChange={this.handleChange}
        />
        <label>Description</label>
        <input
          type='text'
          name='description'
          value={this.state.description}
          onChange={this.handleChange}
        />
        <button type='submit'>upload</button>
      </form>
    );
  }
}

PictureForm.propTypes = {
  onComplete: PropTypes.func,
};
