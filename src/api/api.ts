import fetch from 'node-fetch';

export function api<T>(
  url: string,
  token: string,
  projectId?: string
): Promise<T> {
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
