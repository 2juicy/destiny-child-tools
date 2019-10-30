import React from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import {setFilter} from '../actions/child-list.js'

const useStyles = makeStyles({
  filter: {marginRight: '1rem'}
})

const Filter = ({children, value, label, name, setFilter}) => {
  const classes = useStyles()
  return (
    <FormControl className={classes.filter} margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={e => setFilter(name, e.target.value)}>
        {children}
      </Select>
    </FormControl>
  )
}

export default connect(
  null,
  {setFilter}
)(Filter)
