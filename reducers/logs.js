import {
  ADD_LOG,
} from '../actions';

const logs = (state = [], action) => {
  switch (action.type) {
    case ADD_LOG:
      return [
        ...state,
        {
          id: action.id,
          ...action.productLog,
        },
      ];
    default:
      return state;
  }
};

export default logs;
