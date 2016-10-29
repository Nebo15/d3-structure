
import select from './selection';

export default (selector) => {
  const asD3 = select(selector);
  const API = {
    d3: asD3,
  };

  return API;
};
