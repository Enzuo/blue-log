import { handle as handleAsync } from 'redux-pack';


/* Actions
============================================================================= */
const ADD = 'log/ADD';
const EDIT = 'log/EDIT';
const LOAD = 'log/LOAD';


/* Reducer
============================================================================= */
function add(state, payload) {
  const logs1 = [
    ...state,
    payload,
  ];
  return logs1.sort((a, b) => a.date < b.date);
}

function edit(state, payload) {
  const logs = state.map(log => (
    payload.id === log.id ? payload : log
  ));
  return logs.sort((a, b) => a.date < b.date);
}

function load(state, action) {
  return handleAsync(state, action, {
    finish: () => ([...action.payload]),
  });
}

export default (state = [], action) => {
  switch (action.type) {
    // case function
    case ADD:
      return add(state, action.payload);
    case EDIT:
      return edit(state, action.payload);
    case LOAD:
      return load(state, action);
    default:
      return state;
  }
};


/* Action creators
============================================================================= */

let nextLogId = 1;

export const addLog = (productLog) => {
  if (productLog.id) {
    return {
      type: EDIT,
      payload: productLog,
    };
  }
  const newId = nextLogId++;
  return {
    type: ADD,
    payload: { id: newId, ...productLog },
  };
};

function delay(t, v) {
  return new Promise(((resolve) => {
    setTimeout(resolve.bind(null, v), t);
  }));
}

const databaseLoadLogs = async () => {
  await delay(5000);
  return [{
    id: 1,
    name: 'test async 1',
  }, {
    id: 2,
    name: 'test async 2',
  }];
};

export const loadLogs = options => ({
  type: LOAD,
  promise: databaseLoadLogs(options),
});
