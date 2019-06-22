import React from 'react'
import {connect} from 'react-redux'
import RouterLink from '../link.jsx'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'
import TablePagination from '@material-ui/core/TablePagination'
import ChildsTable from './table.jsx'
import ChildCards from './cards.jsx'
import Filters from './filters.jsx'
import EditButton from '../edit-button.jsx'
import {setPage, setFilter} from '../actions/child-list.js'

const Childs = ({
  childs,
  numToShow,
  sort,
  asc,
  page,
  stars,
  element,
  type,
  view,
  setPage,
  setFilter
}) => {
  childs = childs.toList()
    .sortBy(child =>
      sort == 'variants'
        ? child.get('variants').size
        : child.get(sort) || (asc ? Infinity : -1 * Infinity)
    )
  if(stars) childs = childs.filter(child => child.get('stars') == stars)
  if(element) childs = childs.filter(child => child.get('element') == element)
  if(type) childs = childs.filter(child => child.get('type') == type)
  if(!asc) childs = childs.reverse()
  const numChilds = childs.size
  childs = childs.slice(numToShow * page, numToShow * page + numToShow)
  return (
    <div>
      <Box mb={2}>
        <EditButton />
        <Breadcrumbs aria-label="Breadcrumb">
          <Link component={RouterLink} to="/">Home</Link>
          <Typography color="textPrimary">Childs</Typography>
        </Breadcrumbs>
      </Box>
      <Filters />
      {view == 'table'
        ? <ChildsTable childs={childs} numChilds={numChilds} />
        : <ChildCards childs={childs} />
      }
      <Paper>
        <TablePagination
          component="div"
          rowsPerPageOptions={[10, 20, 50, 100, 200]}
          page={page}
          rowsPerPage={numToShow}
          count={numChilds}
          onChangeRowsPerPage={e => setFilter('numToShow', e.target.value)}
          onChangePage={(e, newPage) => setPage(newPage)} />
      </Paper>
    </div>
  )
}

export default connect(
  state => {
    const childList = state.get('childList')
    return {
      childs: state.get('childs'),
      numToShow: childList.get('numToShow'),
      sort: childList.get('sort'),
      asc: childList.get('asc'),
      page: childList.get('page'),
      stars: childList.get('stars'),
      element: childList.get('element'),
      type: childList.get('type'),
      view: childList.get('view'),
    }
  },
  {setFilter, setPage}
)(Childs)
