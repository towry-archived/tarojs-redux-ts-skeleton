import apiUrl from './apiUrl';

const assign = Object.assign;

export default function configOptionInterceptor(
  stateCollector,
  setter
) {
  setter((options) => {
    const state = stateCollector();
    options.url = apiUrl(options.url || '');

    let header = assign({}, {
      authToken: state.token || '',
    }, options.header || {});

    return assign({}, options, {
      header,
    });
  })
}
