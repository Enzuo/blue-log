import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
// defaults to localStorage for web and AsyncStorage for react-native
import storage from 'redux-persist/lib/storage';

import blueLogReducers from './reducers/reducers';
import {
  addLog,
} from './actions';


const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, blueLogReducers);
const store = createStore(persistedReducer);
const persistor = persistStore(store);


const unsubscribe = store.subscribe(() => console.log(store.getState()));

store.dispatch(addLog({ name: 'test', qty: 250 }));
store.dispatch(addLog({ name: 'Carrote', energy: 450 }));
store.dispatch(addLog({ name: 'Patate', qty: 25 }));
store.dispatch(addLog({ name: 'Un truc avec un nom super super long quoi comment ca se fait', qty: 25 }));

export { store, persistor };
