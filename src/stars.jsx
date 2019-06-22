import React from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import StarsInput from './stars-input.jsx'

const useStyles = makeStyles({
  star: {
    height: '1.2em',
    position: 'relative',
    top: '.3em'
  },
  stars: {
    whiteSpace: 'nowrap'
  }
})

const Stars = ({child, mode}) => {
  const stars = child.get('stars'),
        classes = useStyles()
  return mode == 'edit'
    ? <StarsInput child={child} />
    : stars
      ? <span className={classes.stars} title={`${stars} Stars`}>
        {(new Array(stars)).fill(0).map((_, i) =>
          <img key={'star' + i} src="./img/star.png" className={classes.star}/>
        )}
      </span>
      : ''
}

export default connect(
  state => ({
    mode: state.get('child').get('mode')
  })
)(Stars)
