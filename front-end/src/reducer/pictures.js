const initialState = {
  array: [],
};
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'USER_PICTURES_SET':
      return { ...state, array: state.array.concat(payload) };
    default:
      return state;
  }
};
