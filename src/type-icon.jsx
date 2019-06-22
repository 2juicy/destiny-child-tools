import React from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import TypeInput from './type-input.jsx'

const useStyles = makeStyles({
  icon: {
    height: '1.3em',
    position: 'relative',
    top: '.3em'
  },
})

const TypeIcon = ({child, type, mode}) => {
  const classes = useStyles()
  type = child ? child.get('type') : type
  return type
    ? (child && mode == 'edit')
      ? <TypeInput child={child} />
      : (
        <img
          src={`./img/types/${type}.png`}
          className={classes.icon}
          title={type.charAt(0).toUpperCase() + type.slice(1)}/>
      )
    : ''
}

export default connect(
  state => ({
    mode: state.get('child').get('mode')
  })
)(TypeIcon)
