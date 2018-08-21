const _axios = require('axios');

const axios = _axios.create({
  baseURL: 'https://api.harvestapp.com/api/v2',
  headers: {
    'Harvest-Account-ID': process.env.HARVEST_ACCOUNT_ID,
    'Authorization': `Bearer ${process.env.HARVEST_ACCESS_TOKEN}`,
    'Accept': 'application/json',
  },
});

function handleData(res) {
  return res.data;
}

function me() {
  return axios
    .get('users/me')
    .then(handleData)
  ;
}

function meProjectAssignments() {
  return axios
    .get('/users/me/project_assignments')
    .then(handleData)
  ;
}

function projects() {
  return axios
    .get('/projects')
    .then(handleData)
  ;
}

function projectTasks(projectId) {
  return axios
    .get(`/projects/${projectId}/task_assignments`)
    .then(handleData)
  ;
}

function timeEntries() {
  return axios
    .get('/time_entries')
    .then(handleData)
  ;
}

function createTimeEntry(project_id, task_id, spent_date, hours) {
  return axios
    .post('/time_entries', {
      project_id,
      task_id,
      spent_date,
      hours,
    })
    .then(handleData)
  ;
}

module.exports = {
  me,
  meProjectAssignments,
  projects,
  projectTasks,
  timeEntries,
  createTimeEntry,
};
