import { handle as handleAsync } from 'redux-pack';

import db from '../database';
import { rowsToObj } from '../utils/websql';


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
      return handleAsync(state, action, {
        finish: prevState => add(prevState, action.payload),
      });
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

  // const newId = nextLogId++;
  return {
    type: ADD,
    promise: rowsToObj(db.query('createProductLog', productLog)),
    // payload: { id: newId, ...productLog },
  };
};

export const loadLogs = options => ({
  type: LOAD,
  promise: rowsToObj(db.query('listLog', options), true),
});
