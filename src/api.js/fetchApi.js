const axios = require('axios/dist/browser/axios.cjs');
export function fechApi(url) {
  return axios.get(url).then(res => {
    if (!res.readyState === 4) {
      if (!res.status === 200) {
        throw new Error(res.statusText);
      }
    }
    return res.data;
  });
}

export const config = {
  headers: {
    'cache-control': 'max-age=86400',
    'content-language': 'en',
    'content-type': 'application/json',
  },
};
