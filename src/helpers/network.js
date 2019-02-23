import { API_URL } from '../constants';
import * as t from '../constants/ActionTypes';
import { ResponseError } from '../helpers/errors';

export function httpRequest(path, init) {
  const base = API_URL.replace(/[\\/]$/, '');
  return (
    fetch(`${base}${path}`, init)
      // process network problem
      .then(res => {
        if (!res.ok) throw new ResponseError('network_error', res);
        return res.json();
      })
      // process api problem
      .then(res => {
        const { status, message = 'empty_message_from_server' } = res;

        if (status === t.API_FAILED_STATUS) {
          throw new ResponseError(message, res);
        }

        if (status !== t.API_SUCCESSED_STATUS) {
          throw new ResponseError('unknown_server_status', res);
        }

        return res;
      })
  );
}

export function httpGet(path, init) {
  return httpRequest(path, init);
}

export function httpPost(path, init = {}) {
  return httpRequest(path, { method: 'POST', ...init });
}
