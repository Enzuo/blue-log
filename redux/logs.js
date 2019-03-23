/* Actions
============================================================================= */
const ADD = 'log/ADD';
const EDIT = 'log/EDIT';


/* Reducer
============================================================================= */

export default (state = [], action) => {
  switch (action.type) {
    // case function
    case ADD:
      const logs1 = [
        ...state,
        {
          id: action.id,
          ...action.productLog,
        },
      ];
      return logs1.sort((a, b) => a.date < b.date);
    case EDIT:
      const logs = state.map(log => (action.productLog.id === log.id ? action.productLog : log));
      return logs.sort((a, b) => a.date < b.date);
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
      productLog,
    };
  }
  return {
    type: ADD,
    id: nextLogId++,
    productLog,
  };
};
