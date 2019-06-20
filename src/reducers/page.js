import {NOT_FOUND} from 'redux-first-router'
import routes from '../routes.js'

const components = Object.keys(routes).reduce((acc, route) => {
  acc[route] = route
  return acc
}, {[NOT_FOUND]: 'NotFound'})

export default (state = 'HOME', action = {}) => components[action.type] || state
