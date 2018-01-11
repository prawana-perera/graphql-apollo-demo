import React, { Component } from 'react'

class PolicySummary extends Component {

  render() {
    const { policy } = this.props

    return (
      <div>
        <div>{policy.policyName} - ${policy.monthlyPremium}</div>
      </div>
    )
  }
}

export default PolicySummary
