export const fetchChilds = () => dispatch => {
  fetch('./data/childs.json')
  .then(response => response.json())
  .then(childs => {
    dispatch({type: 'SET_CHILDS', childs})
  })
}
