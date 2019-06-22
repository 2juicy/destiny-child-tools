import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import RouterLink from '../link.jsx'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'
import TablePagination from '@material-ui/core/TablePagination'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import {setNumToShow, setPage, setFilter} from '../actions/child-list.js'
import ChildsTable from './table.jsx'
import EditButton from '../edit-button.jsx'

const useStyles = makeStyles({
  filter: {
    marginRight: '1rem'
  },
})

const Childs = ({
  childs,
  numToShow,
  setNumToShow,
  sort,
  asc,
  setPage,
  page,
  stars,
  setFilter,
  element,
  type
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
  const classes = useStyles()
  return (
    <div>
      <Box mb={2}>
        <EditButton />
        <Breadcrumbs aria-label="Breadcrumb">
          <Link component={RouterLink} to="/">Home</Link>
          <Typography color="textPrimary">Childs</Typography>
        </Breadcrumbs>
      </Box>
      <Paper>
        <Box mb={2} p={2}>
          <FormControl className={classes.filter}>
            <InputLabel>Show</InputLabel>
            <Select value={numToShow} onChange={e => setNumToShow(e.target.value)}>
              <MenuItem value={10}>10 Childs</MenuItem>
              <MenuItem value={20}>20 Childs</MenuItem>
              <MenuItem value={50}>50 Childs</MenuItem>
              <MenuItem value={100}>100 Childs</MenuItem>
              <MenuItem value={200}>200 Childs</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.filter}>
            <InputLabel>Stars</InputLabel>
            <Select value={stars} onChange={e => setFilter('stars', e.target.value)}>
              <MenuItem value={false}>Any Stars</MenuItem>
              <MenuItem value={5}>5 Stars</MenuItem>
              <MenuItem value={4}>4 Stars</MenuItem>
              <MenuItem value={3}>3 Stars</MenuItem>
              <MenuItem value={2}>2 Stars</MenuItem>
              <MenuItem value={1}>1 Star</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.filter}>
            <InputLabel>Element</InputLabel>
            <Select value={element} onChange={e => setFilter('element', e.target.value)}>
              <MenuItem value={false}>Any Element</MenuItem>
              <MenuItem value={'light'}>Light</MenuItem>
              <MenuItem value={'dark'}>Dark</MenuItem>
              <MenuItem value={'fire'}>Fire</MenuItem>
              <MenuItem value={'water'}>Water</MenuItem>
              <MenuItem value={'grass'}>Grass</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.filter}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={e => setFilter('type', e.target.value)}>
              <MenuItem value={false}>Any Type</MenuItem>
              <MenuItem value={'attacker'}>Attacker</MenuItem>
              <MenuItem value={'tank'}>Tank</MenuItem>
              <MenuItem value={'healer'}>Healer</MenuItem>
              <MenuItem value={'support'}>Support</MenuItem>
              <MenuItem value={'debuffer'}>Debuffer</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>
      <Paper>
        <ChildsTable childs={childs} />
        <TablePagination
          component="div"
          rowsPerPageOptions={[10, 20, 50, 100, 200]}
          page={page}
          rowsPerPage={numToShow}
          count={numChilds}
          onChangeRowsPerPage={e => setNumToShow(e.target.value)}
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
    }
  },
  {setNumToShow, setPage, setFilter}
)(Childs )
