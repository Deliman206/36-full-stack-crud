import superagent from 'superagent';

const librariesFetch = libraries => ({
  type: 'LIBRARIES_FETCH',
  payload: libraries,
});

const libraryCreate = library => ({
  type: 'LIBRARY_CREATE',
  payload: library,
});

const libraryUpdate = library => ({
  type: 'LIBRARY_UPDATE',
  payload: library,
});

const libraryDelete = library => ({
  type: 'LIBRARY_DELETE',
  payload: library,
});

const librariesFetchRequest = () => (dispatch) => {
  return superagent.get(`${API_URL}/api/library`)
    // .withCredentials()
    .then((response) => {
      dispatch(librariesFetch(response.body));
      return response;
    });
};

const libraryCreateRequest = library => (dispatch) => {
  return superagent.post(`${API_URL}/api/library`)
    .send(library)
    // .withCredentials()
    .then((response) => {
      dispatch(libraryCreate(response.body));
      return response;
    });
};

const libraryUpdateRequest = library => (dispatch) => {
  return superagent.put(`${API_URL}/api/library/${library._id}`)
    .send(library)
    // .withCredentials()
    .then((response) => {
      dispatch(libraryUpdate(response.body));
      return response;
    });
};

const libraryDeleteRequest = library => (dispatch) => {
  return superagent.delete(`${API_URL}/api/library/${library._id}`)
    // .withCredentials()
    .then((response) => {
      dispatch(libraryDelete(library));
      return response;
    });
};

export { libraryCreateRequest, librariesFetchRequest, libraryDeleteRequest, libraryUpdateRequest };
