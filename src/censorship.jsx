import React from 'react'
import {connect} from 'react-redux'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import {setCensorship} from './actions/censorship.js'



const Censorship = ({censorship, setCensorship}) => (
  <FormControl>
    <InputLabel>Censorship Level</InputLabel>
    <Select value={censorship} onChange={e => setCensorship(e.target.value)}>
      <MenuItem value={0}>None (nsfw images)</MenuItem>
      <MenuItem value={1}>Mild (uncensored images)</MenuItem>
      {/* <MenuItem value={2}>Moderage (censored images)</MenuItem> */}
      <MenuItem value={3}>Strict (no images)</MenuItem>
    </Select>
  </FormControl>
)

const CensorComponent = ({min, censorship, fallback = null, children}) =>
  censorship <= min ? children : fallback

export const Censor = connect(
  state => ({
    censorship: state.get('censorship')
  })
)(CensorComponent)

export default connect(
  state => ({
    censorship: state.get('censorship')
  }),
  {setCensorship}
)(Censorship)
