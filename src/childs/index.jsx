import React from 'react'
import {connect} from 'react-redux'
import RouterLink from '../link.jsx'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
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
import {setNumToShow, setSort} from '../actions/child-list.js'
import EditButton from '../edit-button.jsx'
import StarsInput from '../stars-input.jsx'
import TypeInput from '../type-input.jsx'
import ElementInput from '../element-input.jsx'
import TypeIcon from '../type-icon.jsx'
import ElementIcon from '../element-icon.jsx'
import {TierPVEInput, TierPVPInput, TierRaidInput, TierBossInput} from '../tier-input.jsx'

const TableChildCellLink = ({child, children, Editor, mode}) => (
  <TableCell>
    {mode == 'edit' && Editor
      ? <Editor child={child} />
    : <Link component={RouterLink}  to={`/childs/${child.get('id')}`}>
      {children || ''}
    </Link>
    }
  </TableCell>
)

const Childs = ({childs, numToShow, setNumToShow, mode, sort, asc, setSort}) => {
  childs = childs.toList()
    .sortBy(child =>
      sort == 'variants'
        ? child.get('variants').size
        : child.get(sort) || (asc ? Infinity : -1 * Infinity)
    )
  if(!asc) childs = childs.reverse()
  childs = childs.take(numToShow)

  const order = asc ? 'asc' : 'desc',
        Sortable = ({name, children}) => (
          <TableCell sortDirection={order}>
            <TableSortLabel active={sort == name} direction={order}
              onClick={() => setSort(name, sort == name
                ? !asc
                : name.match(/^(tier|stars|variants)/) ? false : true)}>
              {children}
            </TableSortLabel>
          </TableCell>
        )
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
              <Sortable name="id">ID</Sortable>
              <Sortable name="name">Name</Sortable>
              <Sortable name="stars">Stars</Sortable>
              <Sortable name="element">Element</Sortable>
              <Sortable name="type">Type</Sortable>
              <Sortable name="tierPVE">Tier PVE</Sortable>
              <Sortable name="tierPVP">Tier PVP</Sortable>
              <Sortable name="tierRaid">Tier Raid</Sortable>
              <Sortable name="tierBoss">Tier Boss</Sortable>
              <Sortable name="variants">Variants</Sortable>
            </TableRow>
          </TableHead>
          <TableBody>
            {childs.map(child => {
              const id = child.get('id')
              return (
                <TableRow key={id + 'list'}>
                  <TableChildCellLink child={child}>
                    {id}
                  </TableChildCellLink>
                  <TableChildCellLink child={child}>
                    {child.get('name')}
                  </TableChildCellLink>
                  <TableChildCellLink child={child} mode={mode} Editor={StarsInput}>
                    {child.get('stars')}
                  </TableChildCellLink>
                  <TableChildCellLink child={child} mode={mode} Editor={ElementInput}>
                    {child.get('element')
                      ? <ElementIcon child={child} />
                      : ''
                    }
                  </TableChildCellLink>
                  <TableChildCellLink child={child} mode={mode} Editor={TypeInput}>
                    {child.get('type')
                      ? <TypeIcon child={child} />
                      : ''
                    }
                  </TableChildCellLink>
                  <TableChildCellLink child={child} mode={mode} Editor={TierPVEInput}>
                    {child.get('tierPVE')}
                  </TableChildCellLink>
                  <TableChildCellLink child={child} mode={mode} Editor={TierPVPInput}>
                    {child.get('tierPVP')}
                  </TableChildCellLink>
                  <TableChildCellLink child={child} mode={mode} Editor={TierRaidInput}>
                    {child.get('tierRaid')}
                  </TableChildCellLink>
                  <TableChildCellLink child={child} mode={mode} Editor={TierBossInput}>
                    {child.get('tierBoss')}
                  </TableChildCellLink>
                  <TableChildCellLink child={child}>
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
    const childList = state.get('childList')
    return {
      childs: state.get('childs'),
      numToShow: childList.get('numToShow'),
      sort: childList.get('sort'),
      asc: childList.get('asc'),
      mode: state.get('child').get('mode')
    }
  },
  {setNumToShow, setSort}
)(Childs )
