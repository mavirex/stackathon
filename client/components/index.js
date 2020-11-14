import React, { Component } from 'react'
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom'
import { connect } from 'react-redux';

import { checkCookies } from '../redux/users/user'

import NotFound from './NotFound'
import TopNav from './navbars/TopNav'
import LeftNav from './navbars/LeftNav'
import RightNav from './navbars/RightNav'
import Welcome from './authentication/Welcome'
import Login from './authentication/Login'
import Signup from './authentication/Signup'
import Question from './questions/Question'

class App extends Component {
  componentDidMount () {
    this.props.checkCookies()
  }
  render () {
    const { user, loading, bounty } = this.props
    if (loading) {
      return (
        <div>Loading</div>
      )
    } else {
    return (
      <Router>
          {
            user && !bounty ?
            <div>
              <Route path='/play' render={() => <TopNav />} />
              <Route path='/play' render={() => <LeftNav />} />
              <Route path='/play' render={() => <RightNav />} />
            </div>
            : null
          }
          <main>
            <Switch>
              <Route path='/' exact component={Welcome} />
              <Route path='/login' exact component={Login} />
              <Route path='/signup' exact component={Signup} />
              <Route path='/about' exact component={Welcome} />
              { bounty ?
                  <Route path='/play' render={() => <Question />} />
                : null
              }
            <Route component={NotFound} />
            </Switch>
          </main>
      </Router>
    ) 
  }
}
}


const mapStateToProps = (state) => ({
  loading: state.loading,
  user: state.user,
  bounty: state.bounty
})

const mapDispatchToProps = (dispatch) => ({
  checkCookies: () => {
    dispatch(checkCookies())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
