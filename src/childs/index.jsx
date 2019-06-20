import React from 'react'
import {connect} from 'react-redux'
import RouterLink from '../link.jsx'
import Link from '@material-ui/core/Link'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText  from '@material-ui/core/ListItemText'

const Childs = ({childs}) => {
  return (
    <div>
      <Breadcrumbs aria-label="Breadcrumb">
        <Link component={RouterLink} to="/">Home</Link>
        <Typography color="textPrimary">Childs</Typography>
      </Breadcrumbs>
      <List>
        {childs.map(({name, id}, i) =>
          <ListItem button component={RouterLink} to={`childs/${id}`} key={id + 'list'}>
            <ListItemText primary={`${name} (${id})`} />
          </ListItem>
        )}
      </List>
    </div>
  )
}

export default connect(
  ({childs, childList}) => ({
    childs: childList.map(key => childs[key])
  })
)(Childs )
