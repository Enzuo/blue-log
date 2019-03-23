import { handle as handleAsync } from 'redux-pack';

import db from '../database';
import { rowsToObj, waitAndReturn } from '../utils/websql';


/* Actions
============================================================================= */
const ADD = 'log/ADD';
const EDIT = 'log/EDIT';
const LOAD = 'log/LOAD';
const REMOVE = 'log/REMOVE';


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

function remove(state, payload) {
  return state.filter(log => {
    console.log('PAYLOAD', payload);
    console.log(payload.indexOf(log.id)  < 0, log.id);
    return payload.indexOf(log.id) < 0
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
      return handleAsync(state, action, {
        finish: prevState => edit(prevState, action.payload),
      });
    case LOAD:
      return handleAsync(state, action, {
        finish: () => ([...action.payload]),
      });
    case REMOVE:
      return handleAsync(state, action, {
        finish: prevState => remove(prevState, action.payload),
      });
    default:
      return state;
  }
};


/* Action creators
============================================================================= */

export const addLog = (productLog) => {
  if (productLog.id) {
    return {
      type: EDIT,
      promise: waitAndReturn(db.query('productLog:update', productLog), productLog),
    };
  }

  // const newId = nextLogId++;
  return {
    type: ADD,
    promise: rowsToObj(db.query('productLog:create', productLog)),
  };
};

export const loadLogs = options => ({
  type: LOAD,
  promise: rowsToObj(db.query('listLog', options), true),
});

export const deleteLogs = ids => ({
  type: REMOVE,
  promise: waitAndReturn(db.query('productLog:delete', { ids }), ids),
});
