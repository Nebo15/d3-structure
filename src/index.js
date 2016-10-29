
import { Observable } from 'rx-lite';
import select from './selection';

export default (selector) => {
  const asD3 = select(selector);
  const d3s = Observable.create(observer =>
    observer.onNext(asD3)
  );

  const API = {
    d3s,
    d3: asD3,
  };

  return API;
};
