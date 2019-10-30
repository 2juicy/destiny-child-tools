import {Map} from 'immutable'

export default (state = Map({mode: 'view'}), action) => {
  if(action.type == 'CHILD_SET_MODE') {
    state = state.set('mode', action.mode)
  }
  return state
}
