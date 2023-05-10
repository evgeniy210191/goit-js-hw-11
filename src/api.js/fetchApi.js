const axios = require('axios/dist/browser/axios.cjs');

export async function fechApi(url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(res.statusText);
  }
}

export const config = {
  headers: {
    'cache-control': 'max-age=86400',
    'content-language': 'en',
    'content-type': 'application/json',
  },
};
