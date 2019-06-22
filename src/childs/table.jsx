import React from 'react'
import {connect} from 'react-redux'
import RouterLink from '../link.jsx'
import Link from '@material-ui/core/Link'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import StarsInput from '../stars-input.jsx'
import TypeInput from '../type-input.jsx'
import ElementInput from '../element-input.jsx'
import TypeIcon from '../type-icon.jsx'
import ElementIcon from '../element-icon.jsx'
import {TierPVEInput, TierPVPInput, TierRaidInput, TierBossInput} from '../tier-input.jsx'
import {setSort} from '../actions/child-list.js'

const TableChildCellLink = ({child, children, Editor, mode}) => (
  <TableCell>
    {mode == 'edit' && Editor
      ? <Editor child={child} />
      : <Link component={RouterLink} to={`/childs/${child.get('id')}`}>
        {children || ''}
      </Link>
    }
  </TableCell>
)

const ChildsTable = ({childs, order, asc, sort, setSort, mode}) => {
  const Sortable = ({name, children}) => (
    <TableCell sortDirection={order}>
      <TableSortLabel active={sort == name} direction={order}
        onClick={() => setSort(name, sort == name
          ? !asc
          : name.match(/^(tier|stars|variants|element|type)/))}>
        {children}
      </TableSortLabel>
    </TableCell>
  )
  return (
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
  )
}

export default connect(
  state => {
    const childList = state.get('childList')
    return {
      mode: childList.get('mode'),
      asc: childList.get('asc'),
      order: childList.get('order'),
      sort: childList.get('sort'),
    }
  },
  {setSort}
)(ChildsTable)
