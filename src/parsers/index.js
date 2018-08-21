function meParser(data) {
  return [
    ['ID', 'Name', 'Email', 'Active', 'Admin', 'PM', 'Capacity'],
    [
      data.id,
      `${data.first_name} ${data.last_name}`,
      data.email,
      data.is_active,
      data.is_admin,
      data.is_project_manager,
      data.weekly_capacity / 3600,
    ],
  ];
}

function meProjectAssignmentsParser(data) {
  return data['project_assignments']
    .map(p => {
      return {
        client: `${p.client.name} (${p.client.id})`,
        project: `${p.project.name} (${p.project.id})`,
        tasks: p['task_assignments'].map(t => `${t.task.name} (${t.task.id})`),
      };
    })
    .reduce((s, p) => {
      return s.concat(
        p
          .tasks
          .map(t => [p.client, p.project, t])
      );
    }, [['Client', 'Project', 'Task']])
  ;
}

function timeEntriesParser(data) {
  const headers = [['ID', 'Spent Date', 'Hours', 'Started', 'Ended', 'Client', 'Project', 'Task']]
  const entries = data['time_entries']
    .map(t => {
      return [
        t.id,
        t.spent_date,
        t.hours,
        t.started_time || '-',
        t.ended_time || '-',
        `${t.client.name} (${t.client.id})`,
        `${t.project.name} (${t.project.id})`,
        `${t.task.name} (${t.task.id})`,
      ];
    })
  ;

  return headers.concat(entries);
}

module.exports = {
  meParser,
  meProjectAssignmentsParser,
  timeEntriesParser,
};
