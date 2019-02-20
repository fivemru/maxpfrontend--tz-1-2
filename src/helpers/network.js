import { API_URL } from '../constants';

export function httpRequest(path, init) {
  const base = API_URL.replace(/[\\/]$/, '');
  return fetch(`${base}${path}`, init).then(res => {
    if (!res.ok) throw res;
    return res.json();
  });
}

export function httpGet(path, init) {
  return httpRequest(path, init);
}

export function httpPost(path, init = {}) {
  return httpRequest(path, { method: 'POST', ...init });
}
