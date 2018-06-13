const validateProfile = (profile) => {
  if (!profile) {
    throw new Error('Profile is required!');
  }
  const { 
    username, email, bio, owner, 
  } = profile;
  if (!username || !email || !bio || !owner) throw new Error('Invalid profile submission');
  return undefined;
};

export default (state = null, { type, payload }) => {
  switch (type) {
    case 'USER_PROFILE_SET':
      validateProfile(payload);
      return payload;
    case 'TOKEN_REMOVE':
      return null;
    default:
      return state;
  }
};
