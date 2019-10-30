import React from 'react'
import {connect} from 'react-redux'
import {setChildType} from './actions/childs.js'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

const Stars = ({stars}) => stars + ' Stars'

const TypeInput = ({child, setChildType, processing}) => (
  <FormControl>
    <InputLabel>Type</InputLabel>
    <Select value={child.get('type') || false} onChange={e => setChildType(child, e.target.value)} disabled={processing}>
      <MenuItem value={false}>unknown</MenuItem>
      <MenuItem value={'attacker'}>Attacker</MenuItem>
      <MenuItem value={'tank'}>Tank</MenuItem>
      <MenuItem value={'healer'}>Healer</MenuItem>
      <MenuItem value={'support'}>Support</MenuItem>
      <MenuItem value={'debuffer'}>Debuffer</MenuItem>
    </Select>
  </FormControl>
)

export default connect(
  state => ({
    processing: state.get('processing')
  }),
  {setChildType}
)(TypeInput)
