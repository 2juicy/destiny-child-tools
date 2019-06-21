const defaultState = typeof localStorage.getItem('censorship') == 'string'
  ? parseInt(localStorage.getItem('censorship'))
  : 1

export default (state = defaultState, action) => {
  if(action.type == 'CENSORSHIP_SET') {
    localStorage.setItem('censorship', parseInt(action.censorship))
    return action.censorship
  }
  return state
}
