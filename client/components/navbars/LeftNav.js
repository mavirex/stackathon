import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBounty } from '../../redux/bounties/bounty'
import { updateUser } from '../../redux/users/user'

class LeftNav extends Component {
  constructor(props) {
    super(props)
    this.rechargeBlasts = this.rechargeBlasts.bind(this)
  }
  rechargeBlasts () {
    const { user, updateUser } = this.props
    if (user.credits < 100) {
      alert("It costs 100 credits per Quantum Blast")
    } else if (user.quantumBlasts >= 10) {
      alert("You can only have a maximum of 10 Quantum Blasts")
    } else {
      const credits = user.credits - 100
      const quantumBlasts = user.quantumBlasts + 1
      updateUser(user.id, {
        credits,
        quantumBlasts
      })
    }
  }
  render () {
    const { rechargeBlasts } = this
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
        <div>
          <div>Quantum Blasts:{user.quantumBlasts}</div>
          <button onClick={rechargeBlasts}>Recharge Blasts (100 Credits)</button>
        </div>
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
    },
    updateUser: (userId, newUserInfo) => {
      dispatch(updateUser(userId, newUserInfo))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(LeftNav)
