import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LibraryForm from './../library-form/library-form';
import * as libraryActions from '../../actions/library-actions';

class Dashboard extends React.Component {
  // componentDidMount() {
  //   this.props.librariesFetch();
  // }

  render() {
    const { 
      libraries, libraryCreate, libraryDelete, libraryUpdate, 
    } = this.props;
    return (
      <div>
        <p>Only see me if you are logged in</p>
        {/* <h2>Library App</h2>
        <LibraryForm
          onComplete={libraryCreate}
          buttonText='Create Library' // may not be neccessary
        />
        { libraries ? 
          libraries.map((library) => {
            return (
              <div key={library._id}>
                <p>{library.name}</p>
                <button onClick={() => libraryDelete(library)}>Delete</button>
                <LibraryForm 
                libraryId={library._id}
                onComplete={libraryUpdate}
                buttonText='Update Library'
                />
              </div> 
            );
          }) : undefined
        } */}
      </div>
    );
  }
}
Dashboard.propTypes = {
  libraries: PropTypes.array,
  libraryCreate: PropTypes.func,
  librariesFetch: PropTypes.func,
  libraryDelete: PropTypes.func,
  libraryUpdate: PropTypes.func,
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
  libraryUpdate: library => dispatch(libraryActions.libraryUpdateRequest(library)),
});

export default connect(mapStateTopProps, mapDispatchToProps)(Dashboard);
