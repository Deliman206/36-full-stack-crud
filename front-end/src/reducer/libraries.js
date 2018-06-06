import { validateLibrary } from '../utils';

const emptyState = [];

export default (state = emptyState, { type, payload }) => {
  switch (type) {
    case 'LIBRARIES_FETCH':
      return payload;
    case 'LIBRARY_CREATE':
      validateLibrary(payload);
      return [payload, ...state];
    case 'LIBRARY_UPDATE':
      validateLibrary(payload);
      return state.map(item => (item._id === payload.id ? payload : item));
    case 'LIBRARY_DELETE':
      validateLibrary(payload);
      return state.filter(item => (item._id === payload.id ? payload : item));
    default:
      return state;
  }
};
