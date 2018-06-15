import superagent from 'superagent';

export const setPictures = pictures => ({
  type: 'USER_PICTURES_SET',
  payload: pictures,
});

export const getRequest = () => (store) => {
  const { token } = store.getState();
  return superagent.get(`${API_URL}/photos/me`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .then((response) => {
      return store.dispatch(setPictures(response.body));
    });
};

export const createRequest = file => (store) => {
  const { token } = store.getState();
  return superagent.post(`${API_URL}/photos`)
    .set('Authorization', `Bearer ${token}`)
    .field('description', file.description)
    .attach('photo', file.picture)
    .then((response) => {
      return store.dispatch(setPictures(response.body));
    });
};

export const deleteRequest = () => (store) => {
  const { token, profile } = store.getState();

  return superagent.delete(`${API_URL}/photos/${profile._id}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .then(() => {
      console.log('deleted');
    });
};
