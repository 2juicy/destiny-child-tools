import React from 'react'
import {connect} from 'react-redux'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import Filter from './filter.jsx'

const Filters = ({
  numToShow,
  stars,
  element,
  type
}) => {
  return (
    <Paper>
      <Box mb={2} p={2}>
        <Filter label="Show" value={numToShow} name="numToShow">
          <MenuItem value={10}>10 Childs</MenuItem>
          <MenuItem value={20}>20 Childs</MenuItem>
          <MenuItem value={50}>50 Childs</MenuItem>
          <MenuItem value={100}>100 Childs</MenuItem>
          <MenuItem value={200}>200 Childs</MenuItem>
        </Filter>
        <Filter label="Stars" value={stars} name="stars">
          <MenuItem value={false}>Any Stars</MenuItem>
          <MenuItem value={5}>5 Stars</MenuItem>
          <MenuItem value={4}>4 Stars</MenuItem>
          <MenuItem value={3}>3 Stars</MenuItem>
          <MenuItem value={2}>2 Stars</MenuItem>
          <MenuItem value={1}>1 Star</MenuItem>
        </Filter>
        <Filter label="Element" value={element} name="element">
          <MenuItem value={false}>Any Element</MenuItem>
          <MenuItem value={'light'}>Light</MenuItem>
          <MenuItem value={'dark'}>Dark</MenuItem>
          <MenuItem value={'fire'}>Fire</MenuItem>
          <MenuItem value={'water'}>Water</MenuItem>
          <MenuItem value={'grass'}>Grass</MenuItem>
        </Filter>
        <Filter label="Type" value={type} name="type">
          <MenuItem value={false}>Any Type</MenuItem>
          <MenuItem value={'attacker'}>Attacker</MenuItem>
          <MenuItem value={'tank'}>Tank</MenuItem>
          <MenuItem value={'healer'}>Healer</MenuItem>
          <MenuItem value={'support'}>Support</MenuItem>
          <MenuItem value={'debuffer'}>Debuffer</MenuItem>
        </Filter>
      </Box>
    </Paper>
  )
}

export default connect(
  state => {
    const childList = state.get('childList')
    return {
      numToShow: childList.get('numToShow'),
      stars: childList.get('stars'),
      element: childList.get('element'),
      type: childList.get('type'),
    }
  }
)(Filters)
