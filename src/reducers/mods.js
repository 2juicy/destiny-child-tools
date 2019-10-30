import {fromJS, List} from 'immutable'

export default function(state = List(), action) {
  if(action.type == 'MODS_SET') {
    return fromJS(action.mods)
  }
  return state
}
