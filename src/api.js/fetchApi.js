export function fechApi(url, { option }) {
  return fetch(url, option).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });
}

export const config = {
  headers: {
    'cache-control': 'max-age=86400',
    'content-language': 'en',
    'content-type': 'application/json',
    'last-modified': 'Sun, 07 May 2023 12:50:28 GMT',
    'last-modified': 'Sun, 07 May 2023 12:50:28 GMT',
    'x-ratelimit-limit': '100',
    'x-ratelimit-remaining': '99',
    'x-ratelimit-reset': '0.6',
  },
};
