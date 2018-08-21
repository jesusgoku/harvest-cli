const program = require('commander');
const table = require('table');

const api = require('./api');
const parsers = require('./parsers');

program
  .usage('[options] <action>')
  .version('1.0.0', '-v, --version')
  .parse(process.argv)
;

const action = program.args.length
  ? program.args[0].toLowerCase()
  : 'me'
;

const actions = {
  'me': {
    apiCall: api.me,
    dataParser: parsers.meParser,
    outputHandle: handleTable,
  },

  'projects': {
    apiCall: api.meProjectAssignments,
    dataParser: parsers.meProjectAssignmentsParser,
    outputHandle: handleTable,
  },

  'tasks': {
    apiCall: api.meProjectAssignments,
    dataParser: parsers.meProjectAssignmentsParser,
    outputHandle: handleTable,
  },

  'time': {
    apiCall: api.timeEntries,
    dataParser: parsers.timeEntriesParser,
    outputHandle: handleTable,
  },

  'create_time': {
    apiCall: api.createTimeEntry,
    dataParser: data => parsers.timeEntriesParser({ time_entries: [data] }),
    outputHandle: handleTable,
  },
};

const currentAction = action in actions
  ? actions[action]
  : null
;

if (!currentAction) {
  console.log('action not found');
  process.exit(1);
}

currentAction
  .apiCall
  .apply(null, program.args.slice(1))
  .then(currentAction.dataParser)
  .then(currentAction.outputHandle)
  .catch(handleError)
;

function handleTable(data) {
  const output = table.table(data);

  console.log(output);
}

function handleData(data) {
  console.log(data);
  return data;
}

function handleError(e) {
  console.log(e);
}
