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

const librariesFetchRequest = () => (store) => {
  return superagent.get(`${API_URL}/api/library`)
    .then((response) => {
      store.dispatch(librariesFetch(response.body));
      return response;
    });
};

const libraryCreateRequest = library => (store) => {
  return superagent.post(`${API_URL}/api/library`)
    .send(library)
    .then((response) => {
      store.dispatch(libraryCreate(response.body));
      return response;
    });
};

const libraryUpdateRequest = library => (store) => {
  return superagent.put(`${API_URL}/api/library/${library._id}`)
    .send(library)
    .then((response) => {
      store.dispatch(libraryUpdate(response.body));
      return response;
    });
};

const libraryDeleteRequest = library => (store) => {
  return superagent.delete(`${API_URL}/api/library/${library._id}`)
    .then((response) => {
      store.dispatch(libraryDelete(library));
      return response;
    });
};

export { libraryCreateRequest, librariesFetchRequest, libraryDeleteRequest, libraryUpdateRequest };
