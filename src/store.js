import {applyMiddleware, compose, createStore, combineReducers} from 'redux'
import thunk from 'redux-thunk'

const childs = (state = {childs: 'here'}, action) => {
  if(action.type == 'SET_CHILDS') return action.childs
  return state
}

const rootReducer = (state, action) => ({
  foo: 'bar'
})

export default createStore(
  combineReducers({childs}),
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)
