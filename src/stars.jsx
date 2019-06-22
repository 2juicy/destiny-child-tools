import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

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

const Stars = ({child}) => {
  const stars = child.get('stars'),
        classes = useStyles()
  return stars
    ? <span className={classes.stars} title={`${stars} Stars`}>
      {(new Array(stars)).fill(0).map((_, i) =>
        <img key={'star' + i} src="./img/star.png" className={classes.star}/>
      )}
    </span>
    : ''
}

export default Stars
