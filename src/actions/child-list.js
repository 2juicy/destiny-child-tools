export const setNumToShow = numToShow => ({
  type: 'CHILD_LIST_SET_NUM_TO_SHOW',
  numToShow
})

export const setPage = page => ({
  type: 'CHILD_LIST_SET_PAGE',
  page
})

export const setSort = (sort, asc = true) => ({
  type: 'CHILD_LIST_SET_SORT',
  sort,
  asc
})

export const setFilter = (filter, value) =>
  dispatch => {
    localStorage.setItem('child-list-filter-' + filter, value)
    dispatch({
      type: 'CHILD_LIST_SET_FILTER',
      filter,
      value
    })
  }
