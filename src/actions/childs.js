export const fetchChilds = () => dispatch => {
  fetch('./data/childs.json')
  .then(response => response.json())
  .then(childs => {
    dispatch({type: 'SET_CHILDS', childs})
  })
}

export const setChildProp = (child, prop, value) =>
  (dispatch, getState) => {
    dispatch({
      type: 'CHILDS_SET_CHILD_PROP',
      prop,
      value,
      child
    })
    dispatch(saveData())
  }

export const setChildStars = (child, stars) =>
  dispatch => dispatch(setChildProp(child, 'stars', stars))

export const setChildType = (child, type) =>
  dispatch => dispatch(setChildProp(child, 'type', type))

export const setChildTier = (child, type, tier) =>
    dispatch => dispatch(setChildProp(child, 'tier' + type, tier))


const saveData = () =>
  (dispatch, getState) => {
    dispatch({type: 'PROCESSING_SET', processing: true})
    fetch('/api/childs/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(getState().get('childs').toJS())
    })
    .then(response => response.json())
    .then(childs => {
      dispatch({type: 'SET_CHILDS', childs})
      dispatch({type: 'PROCESSING_SET', processing: false})
    })
  }
