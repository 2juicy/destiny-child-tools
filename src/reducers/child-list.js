import {fromJS} from 'immutable'

const load = (name, dflt) => {
  const stored = localStorage.getItem('child-list-filter-' + name)
  return stored === null
    ? dflt
    : stored.match(/^true|false$/)
      ? stored === 'true'
      : stored
}

const defaultState = fromJS({
  ids: [],
  numToShow: 20,
  asc: true,
  sort: 'id',
  page: 0,
  element: load('element', false),
  stars: load('stars', false),
  type: load('type', false),
  view: load('view', 'table'),
  filter: ''
})

export default function(state = defaultState, action) {
  if(action.type == 'SET_CHILDS') {
    state = state.set('ids',
      fromJS(Object.keys(action.childs))
        .take(state.get('numToShow'))
    )
  }
  if(action.type == 'CHILD_LIST_SET_NUM_TO_SHOW') {
    state = state.set('numToShow', action.numToShow)
  }
  if(action.type == 'CHILD_LIST_SET_PAGE') {
    state = state.set('page', action.page)
  }
  if(action.type == 'CHILD_LIST_SET_SORT') {
    state = state.merge({
      sort: action.sort,
      asc: action.asc
    })
  }
  if(action.type == 'CHILD_LIST_SET_FILTER') {
    state = state.set(action.filter, action.value)
  }
  return state
}
