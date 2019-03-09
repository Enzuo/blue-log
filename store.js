import { createStore } from 'redux'
import todoApp from './reducers/reducers'
import {
  addTodo,
  addLog,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from './actions'

export const store = createStore(todoApp)

const unsubscribe = store.subscribe(() => console.log(store.getState()))

store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
store.dispatch(addLog({ name : 'test' }))
store.dispatch(addLog({ name : 'Carrote' }))
store.dispatch(addLog({ name : 'Patate' }))
