export default (state = [], action) => {
  if(action.type == 'SET_CHILDS') {
    return Object.keys(action.childs)
  }
  return state
}
