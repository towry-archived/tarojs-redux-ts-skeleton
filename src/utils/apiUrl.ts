
import globalVars from './globalVars';

const apiServer = globalVars.apiServer || {};

export default function apiUrl(path: string, apiPrefix?: string) {
  apiPrefix = apiPrefix || (apiServer.address + (apiServer.port ? `:${apiServer.port}` : ''));

  return apiPrefix + (path[0] === '/' ? '' : '/') + path;
}
