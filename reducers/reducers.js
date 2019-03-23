import { combineReducers } from 'redux';

// slice reducer
import logs from './logs';

// root reducer
const todoApp = combineReducers({
  logs,
});

export default todoApp;
