import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
// defaults to localStorage for web and AsyncStorage for react-native
import storage from 'redux-persist/lib/storage';

import blueLogReducers from './reducers';
import {
  addLog,
} from './logs';


const persistConfig = {
  key: 'root',
  storage,
};
// const persistedReducer = persistReducer(persistConfig, blueLogReducers);
// const store = createStore(persistedReducer);
// const persistor = persistStore(store);

const store = createStore(blueLogReducers);
const persistor = null;


const unsubscribe = store.subscribe(() => console.log(store.getState()));

store.dispatch(addLog({ type: 1, date: new Date(2019, 2, 1).getTime(), name: 'test', qty: 250 }));
store.dispatch(addLog({ type: 1, date: new Date(2019, 2, 1).getTime(), name: 'Carrote', energy: 450 }));
store.dispatch(addLog({ type: 1, date: new Date(2019, 2, 25).getTime(), name: 'Patate', qty: 25 }));
store.dispatch(addLog({ type: 1, date: new Date(2019, 2, 1).getTime(), name: 'Un truc avec un nom super super long quoi comment ca se fait', qty: 25 }));
store.dispatch(addLog({ type: 2, date: new Date(2019, 2, 1).getTime(), name: 'Recette curry', qty: 25 }));
store.dispatch(addLog({ type: 3, date: new Date(2019, 2, 1).getTime(), category: 'Sleep', qty: 25 }));
store.dispatch(addLog({ type: 1, date: new Date(2019, 2, 22, 9).getTime(), name: 'Cheese cake', qty: 250 }));
store.dispatch(addLog({ type: 1, date: new Date(2019, 2, 22, 12).getTime(), name: 'Cheese cake again at noon', qty: 250 }));

export { store, persistor };
