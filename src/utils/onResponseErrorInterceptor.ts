
import ErrTypes from './ErrTypes';

export default function onErrorInterceptor(err, login) {
  return new Promise((res, rej) => {
    switch (err.type) {
      case ErrTypes.API_INVALID_AUTH_CODE:
        console.log("invalid auth token, do login");
        // do login.
        login().then(() => {
          return res();
        }, () => {
          return rej(err);
        });
        break;
      default:
        return rej(err);
    }
  })
}
