import {
  ADD_LOG 
} from '../actions'

const logs = (state = [], action) => {
  switch (action.type) {
    case ADD_LOG:
      return [
        ...state,
        {
          id: action.id,
          date: action.date,
          qty: action.qty,
          name: action.name,
          energy: action.energy
        }
      ]
    default:
      return state
  }
}

export default logs
