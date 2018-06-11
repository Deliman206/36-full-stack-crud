import superagent from 'superagent';

export const setTokenAction = token => ({
  type: 'TOKEN_SET',
  payload: !!token,
});

export const removeTokenAction = () => ({
  type: 'TOKEN_REMOVE',
});

export const signupRequest = user => (store) => {
  return superagent.post(`${API_URL}/signup`)
    .send(user)
    .withCredentials()
    .then((response) => {
      return store.dispatch(setTokenAction(response.text));
    });
};

// Vinicio - request
export const loginRequest = user => (store) => {
  return superagent.get(`${API_URL}/login`)
    .auth(user.username, user.password)
    .withCredentials()
    .then((response) => {
      return store.dispatch(setTokenAction(response.text));
    });
};
