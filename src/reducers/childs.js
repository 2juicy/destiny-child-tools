export default (state = {childs: 'here'}, action) => {
  if(action.type == 'SET_CHILDS') {
    return Object.keys(action.childs).reduce((acc, id) => {
        acc[id] = Object.assign(acc[id], {id})
        return acc
      },
      action.childs
    )
  }
  return state
}
