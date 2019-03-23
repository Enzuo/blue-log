import {
  ADD_LOG,
  EDIT_LOG,
} from '../actions';

// slice reducer
const logs = (state = [], action) => {
  switch (action.type) {
    // case function
    case ADD_LOG:
      return [
        ...state,
        {
          id: action.id,
          ...action.productLog,
        },
      ];
    case EDIT_LOG:
      // return state.map(log => log.id === action.productLog.id ? action.productLog : log);
      // return state.map((log) => {
      //   return log.id === action.productLog.id ? action.productLog : log; });
      return state.map(log => (action.productLog.id === log.id ? action.productLog : log));
    default:
      return state;
  }
};

export default logs;
