import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
  icon: {
    height: '1.1rem'
  },
})


export default ({child, type}) => {
  const classes = useStyles()
  type = child ? child.get('type') : type
  return (
    <img
      src={`./img/types/${type}.png`}
      className={classes.icon}
      title={type.charAt(0).toUpperCase() + type.slice(1)}/>
  )
}
