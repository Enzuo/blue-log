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
  const logs = [
    ...state,
    payload,
  ];
  return logs.sort((a, b) => a.date < b.date);
}

function edit(state, payload) {
  const logs = state.map(log => (
    payload.id === log.id ? payload : log
  ));
  return logs.sort((a, b) => a.date < b.date);
}

function remove(state, payload) {
  return state.filter(log => payload.indexOf(log.id) < 0);
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
        start: prevState => remove(prevState, action.payload),
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
  payload: ids,
});

export const addRecipeLog = (recipeLog) => {
  if (recipeLog.id) {
    return {
      type: EDIT,
      promise: recipeLogDB(recipeLog),
    };
  }

  // const newId = nextLogId++;
  return {
    type: ADD,
    promise: recipeLogDB(recipeLog),
  };
}

async function recipeLogDB(recipeLog) {
  const created = await db.query('recipeLog:create', recipeLog);
  console.log('recipeLogDBCreate', created)
  const idRecipeLog = created.insertId;
  const products = recipeLog.products.map(product => ({ ...product, idRecipeLog }));
  await db.query('recipeLog:createProducts', products);
  return recipeLog;
}
