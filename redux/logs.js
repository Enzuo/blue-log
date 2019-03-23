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
      return [
        ...state,
        {
          id: action.id,
          ...action.productLog,
        },
      ];
    case EDIT:
      return state.map(log => (action.productLog.id === log.id ? action.productLog : log));
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
