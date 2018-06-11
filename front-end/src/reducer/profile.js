const emptyState = {};

export default (state = emptyState, { type, payload }) => {
  // const setState = {
  //   username: payload.username,
  // };

  const validateProfile = (profile) => {
    if (!profile) throw new Error('profile does not exist');
    const { username, email, bio } = profile;
    if (!username || !email || !bio) throw new Error('Invalid Profile');
  };

  switch (type) {
    case 'USER_SET':
      delete payload.password;
      validateProfile(payload);
      return payload;
    case 'TOKEN_REMOVE':
      return null;
    case 'PROFILE_FETCH':
      return payload;
    case 'PROFILE_CREATE':
      return [payload, ...state];
    case 'PROFILE_UPDATE':
      return state.map(item => (item._id === payload._id ? payload : item));
    case 'DELETE_PROFILE':
      return state.filter(item => item._id !== payload._id);
    default:
      return state;
  }
};
