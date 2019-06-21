import {fromJS, Map} from 'immutable'

export default (state = Map(), action) => {
  if(action.type == 'SET_CHILDS') {
    return fromJS(Object.keys(action.childs).reduce((acc, id) => {
        acc[id] = Object.assign(acc[id], {id})
        return acc
      },
      action.childs
    ))
  }
  return state
}
