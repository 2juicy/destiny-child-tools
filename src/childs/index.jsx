import React from 'react'
import {connect} from 'react-redux'
import RouterLink from '../link.jsx'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText  from '@material-ui/core/ListItemText'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import {setNumToShow} from '../actions/child-list.js'

const TableChildCellLink = ({id, children}) => (
  <TableCell>
    <Link component={RouterLink}  to={`/childs/${id}`}>
      {children}
    </Link>
  </TableCell>
)

const Childs = ({childs, numToShow, setNumToShow}) => {
  childs = childs.toList()
    .sortBy(child => child.get('id'))
    .take(numToShow)
  return (
    <div>
      <Box mb={2}>
        <Breadcrumbs aria-label="Breadcrumb">
          <Link component={RouterLink} to="/">Home</Link>
          <Typography color="textPrimary">Childs</Typography>
        </Breadcrumbs>
      </Box>
      <Paper>
        <Box mb={2} p={2}>
          <FormControl>
            <InputLabel>Show</InputLabel>
            <Select value={numToShow} onChange={e => setNumToShow(e.target.value)}>
              <MenuItem value={25}>25 Childs</MenuItem>
              <MenuItem value={50}>50 Childs</MenuItem>
              <MenuItem value={100}>100 Childs</MenuItem>
              <MenuItem value={500}>500 Childs</MenuItem>
              <MenuItem value={999999}>All Childs</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Variants</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {childs.map(child => {
              console.log('asdas');
              const id = child.get('id')
              return (
                <TableRow key={id + 'list'}>
                  <TableChildCellLink id={id}>
                    {id}
                  </TableChildCellLink>
                  <TableChildCellLink id={id}>
                    {child.get('name')}
                  </TableChildCellLink>
                  <TableChildCellLink id={id}>
                    {child.get('variants').size}
                  </TableChildCellLink>
                </TableRow>
              )
            }).toArray()}
          </TableBody>
        </Table>
      </Paper>
    </div>
  )
}

export default connect(
  state => {
    return {
      childs: state.get('childs'),
      numToShow: state.get('childList').get('numToShow')
    }
  },
  {setNumToShow}
)(Childs )
