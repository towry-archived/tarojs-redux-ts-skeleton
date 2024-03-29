
import globalVars from './globalVars';

const apiServer = globalVars.apiServer || {};

export default function apiUrl(path: string, apiPrefix?: string) {
  if (path.indexOf('http:') === 0 || path.indexOf('https:') === 0) {
    return path;
  }

  apiPrefix = apiPrefix || (apiServer.address + (apiServer.port ? `:${apiServer.port}` : ''));

  return apiPrefix + (path[0] === '/' ? '' : '/') + path;
}
