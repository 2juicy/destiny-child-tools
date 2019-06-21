export const fetchChilds = () => dispatch => {
  fetch('./data/childs.json')
  .then(response => response.json())
  .then(childs => {
    dispatch({type: 'SET_CHILDS', childs})
  })
}

export const setChildStars = (child, stars) =>
  (dispatch, getState) => {
    dispatch({
      type: 'CHILDS_SET_CHILD_STARS',
      stars,
      child
    })
    dispatch(saveData())
  }


const saveData = () =>
  (dispatch, getState) => {
    fetch('/api/childs/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(getState().get('childs').toJS())
    })
  }
