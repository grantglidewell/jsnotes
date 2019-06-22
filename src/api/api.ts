import { ApiInterface } from '../interfaces';

import fetch from 'node-fetch';

export function api<T>({
  url,
  token,
  projectId,
  note,
}: ApiInterface): Promise<T> {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      return data.data;
    });
}
