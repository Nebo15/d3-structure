
import { Observable } from 'rx-lite';
import select from './selection';

export default (selector) => {
  const asD3 = select(selector);
  const stream = Observable.create(observer =>
    observer.onNext(asD3)
  );

  const API = {
    stream,
    d3: asD3,
  };

  return API;
};
