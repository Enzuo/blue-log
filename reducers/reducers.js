import { combineReducers } from 'redux';

import logs from './logs';

const todoApp = combineReducers({
  logs,
});

export default todoApp;
