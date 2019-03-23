/* Actions
============================================================================= */
const ADD = 'log/ADD';
const EDIT = 'log/EDIT';


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


export default (state = [], action) => {
  switch (action.type) {
    // case function
    case ADD:
      return add(state, action.payload);
    case EDIT:
      return edit(state, action.payload);
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
