import { createStore } from 'redux'
import todoApp from './reducers/reducers'
import {
  addLog,
} from './actions'

export const store = createStore(todoApp)

const unsubscribe = store.subscribe(() => console.log(store.getState()))

store.dispatch(addLog({ name : 'test' }))
store.dispatch(addLog({ name : 'Carrote' }))
store.dispatch(addLog({ name : 'Patate' }))
