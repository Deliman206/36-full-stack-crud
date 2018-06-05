import React from 'react';
import PropTypes from 'prop-types';
import autoBind from './../../utils';

const defaultState = {
  title: '',
  error: null,
};

export default class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.todo || defaultState;
    autoBind.call(this, TodoForm);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.todo !== this.props.todo) {
      this.setState(this.props.todo);
    }
  }

  handleChange(event) {
    event.preventDefault();
    const { value } = event.target;
    this.setState({ title: value });   
  }

  handleSubmit(event) {
    event.preventDefault();
    const { onComplete } = this.props;
    const result = onComplete(this.state);

    if (result instanceof Promise) {
      result
        .then(() => {
          this.setState(defaultState);
        })
        .catch((error) => {
          console.error('error', error);
          this.setState({ error });
        });
    }
  }

  render() {
    const buttonText = this.props.todo ? 'Update' : 'Create';
    return (
      <form
        onSubmit={this.handleSubmit}
        className='todo-form'>

        <input
          type='text'
          name='title'
          placeholder='What todo?'
          value={this.state.title}
          onChange={this.handleChange}
        />
        <button type='submit'>{buttonText} todo</button>

      </form>
    );
  }
}

TodoForm.propTypes = {
  onComplete: PropTypes.func,
  todo: PropTypes.object,
};
