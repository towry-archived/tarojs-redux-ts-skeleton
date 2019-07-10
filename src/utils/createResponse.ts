import Response from './Response';
import Exception from './Exception';
import ERR_TYPES from './ErrTypes';

export default function createResponse(res): Response {
  let response: Response;
  const statusCode = res.statusCode;

  // handle http res.
  if (statusCode !== 200) {
    let errType = ERR_TYPES.UNKNOWN;

    if (400 <= statusCode && statusCode <= 451) {
      errType = ERR_TYPES.API_CLIENT;
    } else if (500 <= statusCode && statusCode <= 511) {
      errType = ERR_TYPES.API_SERVER;
    }

    response = new Response({ raw: res });
    response.error = new Exception(
      `${res.statusCode}: \`${res.errMsg}\`` || '',
      errType
    );
    return response;
  }

  // 处理业务的status
  let json = res.data || {};
  if (typeof json === 'string') {
    try {
      json = JSON.parse(json);
    } catch (e) {
      json = null;
    }
  }

  if (!json) {
    response = new Response({ raw: res });
    response.error = new Exception('', ERR_TYPES.API_SERVER);
    return response;
  }

  // invalid token ??
  if (json.status === 10009 || json.status === 10010) {
    response = new Response({ raw: res });
    response.error = new Exception(json.message || "Invalid token", ERR_TYPES.API_INVALID_AUTH_CODE);
    return response;
  }

  if (json.status !== 200 && json.status != 0) {
    if (json.status !== 500) {
      let message = json.message || null;
      response = new Response({ raw: res, message });
      response.error = new Exception(message, ERR_TYPES.UNKNOWN);
      return response;
    }
  }

  response = new Response({
    data: json.data,
    status: json.status,
    message: json.message,
    raw: res,
  });

  return response;
}
