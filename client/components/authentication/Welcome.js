import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'
import { connect } from 'react-redux';

class Welcome extends Component {
    render () {
      console.log(this.props)
        return (
            <div id= "welcome-box">
                <div id="welcome-message">
                  Welcome to T.R.I.V.I.A. Space Bounty Hunters!
                </div>
                <div id="welcome-options">
                  <div>
                    <Link to="/login">Log In</Link>
                  </div>
                  <div>
                    <Link to="/signup">Sign Up</Link>
                  </div>
                  <div>
                    About
                  </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
  })
  
  const mapDispatchToProps = (dispatch) => ({
    getQuestions: () => {
      dispatch(getQuestions())
    }
  })
  
  export default connect(mapStateToProps, null)(Welcome)
