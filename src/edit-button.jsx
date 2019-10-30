import React from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {setMode} from './actions/child.js'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import CancelIcon from '@material-ui/icons/Cancel'

const useStyles = makeStyles({
  editButton: {
    marginLeft: '.5rem',
    float: 'right',
    position: 'relative',
    top: '-.6rem'
  }
})

const EditButtonComponent = ({mode, setMode}) => {
  const classes = useStyles()
  return __DEV__
    ? (mode == 'view'
      ? <IconButton className={classes.editButton} aria-label="Edit" onClick={() => setMode('edit')}>
        <EditIcon />
      </IconButton>
      : <IconButton className={classes.editButton} aria-label="Cancel" onClick={() => setMode('view')}>
        <CancelIcon />
      </IconButton>
    )
    : null
  }

export default connect(
  state => ({
    child: state.get('childs').get(state.get('location').payload.id),
    mode: state.get('child').get('mode')
  }),
  {setMode}
)(EditButtonComponent)
