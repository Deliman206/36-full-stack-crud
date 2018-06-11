import superagent from 'superagent';

const setUserProfile = user => ({
  type: 'USER_SET',
  payload: user,
});

const profileFetch = profile => ({
  type: 'PROFILE_FETCH',
  payload: profile,
});

const profileCreate = profile => ({
  type: 'PROFILE_CREATE',
  payload: profile,
});

const profileUpdate = profile => ({
  type: 'PROFILE_UPDATE',
  payload: profile,
});

const profileDelete = profile => ({
  type: 'PROFILE_DELETE',
  payload: profile,
});

const profileFetchRequest = () => (store) => {
  const { token } = store.getState();
  if (!store.profile) return null;
  return superagent.get(`${API_URL}/api/profile/${store.profile.username}`)
    .set('Authorization', `Bearer ${token}`)
    .then((response) => {
      store.dispatch(profileFetch(response.body));
      console.log(response);
      return response;
    })
    .catch(error => new Error(error)); 
};

const profileCreateRequest = profile => (store) => {
  const { token } = store.getState();
  return superagent.post(`${API_URL}/api/profile`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(profile)
    .then((response) => {
      return store.dispatch(profileCreate(response.body));
    });
};

const profileUpdateRequest = profile => (store) => {
  const { token } = store.getState();
  return superagent.put(`${API_URL}/api/profile/${profile._id}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(profile)
    .then((response) => {
      store.dispatch(profileUpdate(response.body));
      return response;
    });
};

const profileDeleteRequest = profile => (store) => {
  return superagent.delete(`${API_URL}/api/profile/${profile._id}`)
    .then((response) => {
      store.dispatch(profileDelete(profile));
      return response;
    });
};

export { 
  setUserProfile, 
  profileFetchRequest, 
  profileCreateRequest, 
  profileUpdateRequest, 
  profileDeleteRequest, 
};
