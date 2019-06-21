export const setNumToShow = numToShow => ({
  type: 'CHILD_LIST_SET_NUM_TO_SHOW',
  numToShow
})

export const setSort = (sort, asc = true) => ({
  type: 'CHILD_LIST_SET_SORT',
  sort,
  asc
})
