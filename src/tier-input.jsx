import React from 'react'
import {connect} from 'react-redux'
import {setChildTier} from './actions/childs.js'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

const TierInput = ({child, setChildTier, type}) => (
  <FormControl>
    <InputLabel>Tier {type}</InputLabel>
    <Select value={child.get('tier' + type) || false} onChange={e => setChildTier(child, type, e.target.value)}>
      <MenuItem value={false}>unknown</MenuItem>
      <MenuItem value={10}>10 (best)</MenuItem>
      <MenuItem value={9}>9</MenuItem>
      <MenuItem value={8}>8</MenuItem>
      <MenuItem value={7}>7</MenuItem>
      <MenuItem value={6}>6</MenuItem>
      <MenuItem value={5}>5</MenuItem>
      <MenuItem value={4}>4</MenuItem>
      <MenuItem value={3}>3</MenuItem>
      <MenuItem value={2}>2</MenuItem>
      <MenuItem value={1}>1 (worst)</MenuItem>
    </Select>
  </FormControl>
)

const TierInputConnected = connect(
  null,
  {setChildTier}
)(TierInput)

export const TierPVEInput = ({child}) => <TierInputConnected child={child} type="PVE" />
export const TierPVPInput = ({child}) => <TierInputConnected child={child} type="PVP" />
export const TierRaidInput = ({child}) => <TierInputConnected child={child} type="Raid" />
export const TierBossInput = ({child}) => <TierInputConnected child={child} type="Boss" />

export default TierInputConnected
