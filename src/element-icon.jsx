import React from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import ElementInput from './element-input.jsx'

const useStyles = makeStyles({
  icon: {
    height: '1.5em',
    position: 'relative',
    top: '.5em'
  },
})

const ElementIcon = ({child, element, mode}) => {
  const classes = useStyles()
  element = child ? child.get('element') : element
  return (child && mode == 'edit')
    ? <ElementInput child={child} />
    : element
      ? (
        <img
          src={`./img/elements/${element}.png`}
          className={classes.icon}
          title={element.charAt(0).toUpperCase() + element.slice(1)}/>
      )
      : ''
}

export default connect(
  state => ({
    mode: state.get('child').get('mode')
  })
)(ElementIcon)
