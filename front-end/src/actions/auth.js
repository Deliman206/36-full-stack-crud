import superagent from 'superagent';
import { deleteCookie } from '../utils/cookies';
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
      return store.dispatch(setTokenAction(response.text));
    });
};

export const loginRequest = user => (store) => {
  return superagent.get(`${API_URL}/login`)
    .auth(user.username, user.password)
    .withCredentials()
    .then((response) => {
      return store.dispatch(setTokenAction(response.text));
    });
};

