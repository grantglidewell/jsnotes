import { ApiInterface } from '../interfaces';

import v4 from 'uuid/v4';
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
      'X-Request-Id': v4(),
    },
  };
  return fetch(url, requestOptions)
    .then(response => {
      if (response.status < 400 && response.data) {
        return response.data;
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch(err => {
      console.error(
        `there was a problem with the request ${(err.statusText &&
          err.statusText) ||
          err}`
      );
      return err;
    });
}
