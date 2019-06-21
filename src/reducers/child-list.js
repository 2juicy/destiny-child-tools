import {fromJS} from 'immutable'

const defaultState = fromJS({
  ids: [],
  numToShow: 25,
  sortOrder: 'asc',
  sortBy: "name"
})

export default (state = defaultState, action) => {
  if(action.type == 'SET_CHILDS') {
    const childs = fromJS(action.childs)
    state = state.set('ids',
      fromJS(Object.keys(action.childs))
      .take(state.get('numToShow'))
    )

  }
  if(action.type == 'CHILD_LIST_SET_NUM_TO_SHOW') {
    state = state.set('numToShow', action.numToShow)
  }
  return state
}
