import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
  icon: {
    height: '1.4em',
    position: 'relative',
    top: '.3em'
  },
})


export default ({child, element}) => {
  const classes = useStyles()
  element = child ? child.get('element') : element
  return (
    <img
      src={`./img/elements/${element}.png`}
      className={classes.icon}
      title={element.charAt(0).toUpperCase() + element.slice(1)}/>
  )
}
