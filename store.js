import { createStore } from 'redux'
import todoApp from './reducers/reducers'
import {
  addLog,
} from './actions'

export const store = createStore(todoApp)

const unsubscribe = store.subscribe(() => console.log(store.getState()))

store.dispatch(addLog({ name : 'test', qty : 250}))
store.dispatch(addLog({ name : 'Carrote', energy : 450 }))
store.dispatch(addLog({ name : 'Patate', qty : 25 }))
store.dispatch(addLog({ name : 'Un truc avec un nom super super long quoi comment ca se fait', qty : 25 }))

