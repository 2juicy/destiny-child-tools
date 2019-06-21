import {createHashHistory} from 'history'
import routes from './routes.js'

export const history = createHashHistory()

export const pushRoute = (route, params) => {
  history.push(
    Object.keys(params).reduce((acc, param) => {
      return acc.replace(':' + param, params[param])
    }, routes[route])
  )
}
