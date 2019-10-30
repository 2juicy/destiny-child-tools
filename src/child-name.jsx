import React from 'react'
import {connect} from 'react-redux'
import {setChildProp} from './actions/childs.js'
import TextField from '@material-ui/core/TextField'

const ChildName = ({child, mode, setChildProp}) => {
  const name = child.get('name'),
        apply = newName => setChildProp(child, 'name', newName)
  return mode == 'edit'
    ? <TextField
      label="Child name"
      value={name}
      onChange={e => apply(e.target.value)} />
    : name
}

export default connect(
  state => ({
    mode: state.get('child').get('mode'),
    processing: state.get('processing')
  }),
  {setChildProp}
)(ChildName)
