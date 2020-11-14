import React, { Component } from 'react'
import { connect } from 'react-redux'

class TopNav extends Component {
  render () {
    const { user } = this.props
    return (
      <div className='topnav'>
        <div>Howdy {user ? user.username : 'Partner'}</div>
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

export default connect(mapStateToProps, null)(TopNav)
