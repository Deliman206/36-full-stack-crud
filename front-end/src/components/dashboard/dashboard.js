import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LibraryForm from './../library-form/library-form';
import * as libraryActions from '../../actions/library-actions';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.librariesFetch();
  }

  render() {
    const { libraries, libraryCreate, libraryDelete } = this.props;
    console.log(this.props);
    return (
      <div>
        <h2>Library App</h2>
        <LibraryForm
          onComplete={libraryCreate}
          onRemove={libraryDelete}
          buttonText='Create Library' // may not be neccessary
        />
        { libraries ? 
          libraries.map((library) => {
            return (
              <div key={library.id}>
                <p></p>
                <button></button>
              </div> 
            );
          }) : undefined
        }
      </div>
    );
  }
}
Dashboard.propTypes = {
  libraries: PropTypes.array,
  libraryCreate: PropTypes.func,
  librariesFetch: PropTypes.func,
  libraryDelete: PropTypes.func,
};

const mapStateTopProps = (state) => {
  return {
    libraries: state.libraries,
  };
};

const mapDispatchToProps = dispatch => ({
  librariesFetch: () => dispatch(libraryActions.librariesFetchRequest()),
  libraryCreate: library => dispatch(libraryActions.libraryCreateRequest(library)),
  libraryDelete: library => dispatch(libraryActions.libraryDeleteRequest(library)),
});

export default connect(mapStateTopProps, mapDispatchToProps)(Dashboard);
