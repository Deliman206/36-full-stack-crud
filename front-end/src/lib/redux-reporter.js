export default store => next => (action) => {
  console.log('__Action__', action);
  const result = next(action);
  console.log('__State__', store.getState());
  return result;
};
