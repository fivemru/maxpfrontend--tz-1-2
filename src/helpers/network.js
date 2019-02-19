import { API_URL } from '../constants';

export function httpGet(path) {
  return fetch(`${API_URL}/${path}`).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });
}
