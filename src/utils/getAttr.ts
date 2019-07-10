import { isNil } from './is';
import { IAnyValue } from '../types/app';

export default function getAttr(path: string, data: IAnyValue, defaultValue?: any): any {
  if (Object.prototype.toString.call(data) !== '[object Object]') {
    return defaultValue;
  }

  let paths = path.split('.');
  let last = data;

  let p: string;

  for (let i = 0; i < paths.length; i++) {
    p = paths[i];
    if (!p && !isNil(defaultValue)) {
      return null;
    }

    last = last[p];
    if (!isNil(last)) {
      return last;
    }
  }

  return isNil(defaultValue) ? last : defaultValue;
}
