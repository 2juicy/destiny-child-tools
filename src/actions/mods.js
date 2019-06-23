export const fetchMods = () => dispatch => {
  fetch('./data/mods.json')
    .then(response => response.json())
    .then(mods => {
      dispatch({type: 'MODS_SET', mods})
    })
}
