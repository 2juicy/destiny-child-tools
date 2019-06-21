export default (state = false, action) => {
  if(action.type == 'PROCESSING_SET') {
    return action.processing
  }
  return state
}
