import React from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import {pushRoute} from '../history.js'
import ChildCard from '../child-card.jsx'

const useStyles = makeStyles({
  card: {
    marginRight: '1rem',
    marginBotton: '1rem',
    cursor: 'pointer',
    display: 'inline-block'
  },
})

const Cards = ({childs, mode}) => {
  const classes = useStyles()
  return <Box p={2}>
    {childs.map(child =>
      <div
        className={classes.card}
        onClick={() => mode != 'edit' && pushRoute('CHILD', {id: child.get('id')})}
        key={child.get('id') + 'card'}>
        <ChildCard child={child} />
      </div>
    )}
  </Box>
}

export default connect(
  state => ({
    mode: state.get('child').get('mode'),
    processing: state.get('processing')
  })
)(Cards)
