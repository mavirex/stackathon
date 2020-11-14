import React, { Component } from 'react'
import { connect } from 'react-redux'

class RightNav extends Component {
  render () {
    const { user } = this.props
    return (
      <div className='sidenav rightnav'>
        <div>Rank: {user.rank.title}</div>
        <div>Merit: {user.merit}</div>
        <div>Daily Score: {user.dailyScore}</div>
        <div>Weekly Score: {user.weeklyScore}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

// const mapDispatchToProps = (dispatch) => ({
//     getQuestions: () => {
//         dispatch(getQuestions())
//     }
// })

export default connect(mapStateToProps, null)(RightNav)
