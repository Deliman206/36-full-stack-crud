import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TodoForm from './../todo-form/todo-form';
import * as todoActions from '../../actions/todo-actions';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.todosFetch();
  }

  render() {
    const { todos, todoCreate, todoDelete } = this.props;
    return (
      <div>
        <h2>Todo App</h2>
        <TodoForm
          onComplete={todoCreate}
          buttonText='Create Todo' // may not be neccessary
        />
        {
          todos.map((todo) => {
            return (
              <div key={todo.id}>
                <p></p>
                <button></button>
              </div>
            );
          })
        }
      </div>
    );
  }
}
Dashboard.propTypes = {
  todosFetch: PropTypes.func,

};

const mapStateTopProps = (state) => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = dispatch => ({
  todosFetch: () => dispatch(todoActions.todosFetchRequest()),
  todosCreate: todo => dispatch(todoActions.todoCreateRequest(todo)),
  todosDelete: todo => dispatch(todoActions.todoDeleteRequest(todo)),
});

export default connect(mapStateTopProps, mapDispatchToProps)(Dashboard);
