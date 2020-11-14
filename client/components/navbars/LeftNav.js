import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBounty } from '../../redux/bounties/bounty'

class LeftNav extends Component {
  render () {
    const { user, getBounty } = this.props
    return (
      <div className='sidenav leftnav'>
        <div>
          <div>Available Bounties:</div>
          <ul>
            <li className="selectBounty" onClick={()=> getBounty("easy")}>Easy</li>
            <li className="selectBounty" onClick={()=> getBounty("medium")}>Medium</li>
            <li className="selectBounty" onClick={()=> getBounty("hard")}>Hard</li>
          </ul>
        </div>
        <div>Credits: {user.credits}</div>
        <div>Quantum Blasts:{user.quantumBlasts}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
    getBounty: (difficulty) => {
        dispatch(getBounty(difficulty))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LeftNav)
