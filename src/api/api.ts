import { ApiInterface } from '../interfaces';

import fetch from 'axios';

export function api<T>(args: ApiInterface): Promise<T> {
  const { url, token, payload, method } = args;

  const requestOptions = {
    method,
    data: payload && JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  return fetch(url, requestOptions)
    .then(response => {
      return response.data;
    })
    .catch(console.error);
}
