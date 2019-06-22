import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
  icon: {
    height: '1.3em',
    position: 'relative',
    top: '.3em'
  },
})

const TypeIcon = ({child, type}) => {
  const classes = useStyles()
  type = child ? child.get('type') : type
  return type
    ? (
      <img
        src={`./img/types/${type}.png`}
        className={classes.icon}
        title={type.charAt(0).toUpperCase() + type.slice(1)}/>
    )
    : ''
}

export default TypeIcon
