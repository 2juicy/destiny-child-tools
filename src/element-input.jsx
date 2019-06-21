import React from 'react'
import {connect} from 'react-redux'
import {setChildProp} from './actions/childs.js'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

const Stars = ({stars}) => stars + ' Stars'

const ElementInput = ({child, setChildProp}) => (
  <FormControl>
    <InputLabel>Element</InputLabel>
    <Select value={child.get('element') || false} onChange={e => setChildProp(child, 'element', e.target.value)}>
      <MenuItem value={false}>unknown</MenuItem>
      <MenuItem value={'light'}>Light</MenuItem>
      <MenuItem value={'dark'}>Dark</MenuItem>
      <MenuItem value={'fire'}>Fire</MenuItem>
      <MenuItem value={'water'}>Water</MenuItem>
      <MenuItem value={'grass'}>Grass</MenuItem>
    </Select>
  </FormControl>
)

export default connect(
  null,
  {setChildProp}
)(ElementInput)
