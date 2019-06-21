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
  if(action.type == 'CHILDS_SET_CHILD_STARS') {
    const id = action.child.get('id')
    return state.set(id, state.get(id).set('stars', action.stars))
  }
  if(action.type == 'CHILDS_SET_CHILD_TYPE') {
    const id = action.child.get('id')
    return state.set(id, state.get(id).set('type', action.childType))
  }
  if(action.type == 'CHILDS_SET_CHILD_TIER') {
    const id = action.child.get('id')
    return state.set(id, state.get(id).set('tier' + action.tierType, action.tier))
  }
  if(action.type == 'CHILDS_SET_CHILD_PROP') {
    const id = action.child.get('id')
    return state.set(id, state.get(id).set(action.prop, action.value))
  }
  return state
}
