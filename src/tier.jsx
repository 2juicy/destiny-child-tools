import React from 'react'
import {connect} from 'react-redux'
import TierInput from './tier-input.jsx'

const Tier = ({child, type, mode}) => {
  const level = child.get('tier' + type)
  return mode == 'edit'
    ? <TierInput child={child} type={type} />
    : typeof level != 'undefined' && (
      <span title={`${type} Tier ${level} out of 10`}>
        {type}: {level}
      </span>
    )
}

export default connect(
  state => ({
    mode: state.get('child').get('mode')
  })
)(Tier)
