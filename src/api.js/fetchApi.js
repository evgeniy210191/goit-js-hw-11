const axios = require('axios/dist/browser/axios.cjs');

export async function fechApi(url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(res.statusText);
  }
}
