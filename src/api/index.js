const _axios = require('axios');

const axios = _axios.create({
  baseURL: 'https://api.harvestapp.com/api/v2',
  headers: {
    'Harvest-Account-ID': process.env.HARVEST_ACCOUNT_ID,
    'Authorization': `Bearer ${process.env.HARVEST_ACCESS_TOKEN}`,
    'Accept': 'application/json',
  },
});

function me() {
  return axios
    .get('users/me.json')
    .then(res => res.data)
  ;
}

module.exports = {
  me,
};
