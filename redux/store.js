import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { middleware as reduxPackMiddleware } from 'redux-pack';
// import AsyncStorage from '@react-native-community/async-storage';


// defaults to localStorage for web and AsyncStorage for react-native
// import storage from 'redux-persist/lib/storage';

import blueLogReducers from './reducers';
import {
  addLog,
  loadLogs,
  addRecipeLog,
} from './logs';


// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// };
// const persistedReducer = persistReducer(persistConfig, blueLogReducers);
// const store = createStore(persistedReducer);
// const persistor = persistStore(store);

const store = createStore(blueLogReducers, applyMiddleware(reduxPackMiddleware));
const persistor = null;


// const unsubscribe = store.subscribe(() => console.log(store.getState()));

store.dispatch(addLog({ type: 1, date: new Date(2019, 2, 1).getTime(), name: 'test', qty: 250 }));
store.dispatch(addLog({ type: 1, date: new Date(2019, 2, 1).getTime(), name: 'Carrote', energy: 450 }));
store.dispatch(addLog({ type: 1, date: new Date(2019, 2, 25).getTime(), name: 'Patate', qty: 25 }));
store.dispatch(addLog({ type: 1, date: new Date(2019, 2, 1).getTime(), name: 'Un truc avec un nom super super long quoi comment ca se fait', qty: 25 }));
store.dispatch(addLog({ type: 2, date: new Date(2019, 2, 1).getTime(), name: 'Recette curry', qty: 25 }));
store.dispatch(addLog({ type: 3, date: new Date(2019, 2, 1).getTime(), category: 'Sleep', qty: 25, name :'note' }));
store.dispatch(addLog({ type: 1, date: new Date(2019, 2, 22, 9).getTime(), name: 'Cheese cake', qty: 250 }));
store.dispatch(addLog({ type: 1, date: new Date(2019, 2, 22, 12).getTime(), name: 'Cheese cake again at noon', qty: 250 }));
store.dispatch(addRecipeLog({
  type: 2,
  date: new Date(2019, 2, 22, 12).getTime(),
  name: 'Recette tartiflette',
  qty: 250,
  products: [{
    name: 'Patate',
    qty: 12,
  }],
}));
// setTimeout(() => {
//   store.dispatch(loadLogs());
// }, 5000);

export { store, persistor };


/**
 * Store structure
 */

const storeStructure = {
  logs: [
    {
      id: 1,
      date: 1543232,
      type: 1,
      product: { // <-- flatten ?
        name: 'tomate',
        energy: 324,
      },
    },
    {
      id: 2,
      date: 15342323,
      type: 2,
      recipe: {
        name: 'recette de tomates',
        products: [{
          name: 'tomate',
          energy: 312,
        },
        {
          name: 'salade',
          energy: 12,
        }],
      },
    },
    {
      id: 12,
      date: 14343,
      type: 3,
      note: {
        title: 'hello',
        description: 'blah blah',
        category: 1,
      },
    },
  ],
  categories: {
    id: 1,
    name: 'Journal',
    color: '#233',
  },
};
