export default (state = null, { type, payload }) => {
  switch (type) {
    case 'USER_PICTURES_SET':
      return payload;
    default:
      return state;
  }
};
