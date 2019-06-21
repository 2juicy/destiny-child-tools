import {applyMiddleware, compose, createStore} from 'redux'
import {combineReducers} from 'redux-immutable'
import thunk from 'redux-thunk'
import {connectRoutes} from 'redux-first-router'
import childList from './reducers/child-list.js'
import childs from './reducers/childs.js'
import page from './reducers/page.js'
import routes from './routes.js'
import {history} from './history.js'

const {reducer, middleware, enhancer} = connectRoutes(routes, {
  createHistory: () => history,
  location: state => state.get('location')
})

const rootReducer = combineReducers({
  childs,
  childList,
  page,
  location: reducer
})
const middlewares = applyMiddleware(middleware, thunk)


const enhancers = [enhancer, middlewares]
if(window.__REDUX_DEVTOOLS_EXTENSION__) enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__())


export default createStore(rootReducer, compose.apply(compose, enhancers))
