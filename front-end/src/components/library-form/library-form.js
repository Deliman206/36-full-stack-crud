import React from 'react';
import PropTypes from 'prop-types';
import autoBind from './../../utils';

const defaultState = {
  name: '',
  error: null,
};

export default class LibraryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.library || defaultState;
    autoBind.call(this, LibraryForm);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.library !== this.props.library) {
      this.setState(this.props.library);
    }
  }

  handleChange(event) {
    event.preventDefault();
    const { libraryId } = this.props;
    const { value } = event.target;
    this.setState({ name: value }); 
    if (libraryId) this.setState({ _id: libraryId });  
  }

  handleSubmit(event) {
    event.preventDefault();
    const { onComplete } = this.props;
    const result = onComplete(this.state);
    this.setState(defaultState);

    if (result instanceof Promise) {
      result
        .then(() => {
          this.setState(defaultState);
        })
        .catch((error) => {
          console.error('error', error); // eslint-disable-line
          this.setState({ error });
        });
    }
  }

  render() {
    const { buttonText } = this.props;
    return (
      <form
        onSubmit={this.handleSubmit}
        className='library-form'>

        <input
          type='text'
          name='title'
          placeholder='+ Library'
          value={this.state.title}
          onChange={this.handleChange}
        />
        {
          this.props.buttonText === 'Create Library' ? 
          <button type='submit'>{buttonText}</button> : 
          <button type='submit'>{buttonText}</button>
        }
      </form>
    );
  }
}

LibraryForm.propTypes = {
  onComplete: PropTypes.func,
  library: PropTypes.object,
  libraryId: PropTypes.string,
  buttonText: PropTypes.string,
};
