import React from 'react'
import {connect} from 'react-redux'
import {setChildStars} from './actions/childs.js'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

const Stars = ({stars}) => stars + ' Stars'

const StarsInput = ({child, setChildStars, processing}) => (
  <FormControl>
    <InputLabel>Star Level</InputLabel>
    <Select value={child.get('stars') || false} onChange={e => setChildStars(child, e.target.value)} disabled={processing}>
      <MenuItem value={false}>unknown</MenuItem>
      <MenuItem value={1}><Stars stars={1} /></MenuItem>
      <MenuItem value={2}><Stars stars={2} /></MenuItem>
      <MenuItem value={3}><Stars stars={3} /></MenuItem>
      <MenuItem value={4}><Stars stars={4} /></MenuItem>
      <MenuItem value={5}><Stars stars={5} /></MenuItem>
    </Select>
  </FormControl>
)

export default connect(
  state => ({
    processing: state.get('processing')
  }),
  {setChildStars}
)(StarsInput)
