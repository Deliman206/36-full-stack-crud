export default function autoBind(classComponent) {
  // this returns an array of methods off class componente's prototype
  const classMethods = Object.getOwnPropertyNames(classComponent.prototype);  
  classMethods.forEach((method) => {
    if (method.startsWith('handle')) {
      this[method] = this[method].bind(this);
    }
  });
}

export const validateLibrary = (payload) => {
  if (!payload._id) {
    throw new Error('VALIDATION_ERROR: library must have an id');
  }
  if (!payload.name) throw new Error('VALIDATION_ERROR: library must have a name');
};
