
export function isObject(v: any): boolean {
  return v && Object.prototype.toString.call(v) === '[object Object]';
}

export function isNil(v: any): boolean {
  return typeof v === 'undefined' || v === null;
}

export function isEmptyString(v: any): boolean {
  return (
    isNil(v) ||
    /^\s*$/.test(v)
  )
}
