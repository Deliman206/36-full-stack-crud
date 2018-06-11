import superagent from 'superagent';
import { deleteCookie } from '../utils/cookie';
import { TOKEN_COOKIE_KEY } from '../constants';

export const setTokenAction = token => ({
  type: 'TOKEN_SET',
  payload: !!token,
});

export const removeTokenAction = () => ({
  type: 'TOKEN_REMOVE',
});


export const logout = () => {
  deleteCookie(TOKEN_COOKIE_KEY);
  return removeTokenAction();
};

export const signupRequest = user => (store) => {
  return superagent.post(`${API_URL}/signup`)
    .send(user)
    .withCredentials()
    .then((response) => {
      console.log(response);
      return store.dispatch(setTokenAction(response.text));
    })
    .then(() => {
      store.dispatch(setUserProfile(user));
    });
};

export const loginRequest = user => (store) => {
  return superagent.get(`${API_URL}/login`)
    .auth(user.username, user.password)
    .withCredentials()
    .then((response) => {
      console.log(response);
      return store.dispatch(setTokenAction(response.text));
    })
    .then(() => {
      store.dispatch(setUserProfile(user));
    });
};
