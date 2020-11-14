import React, { Component } from 'react';
import {
    Link
  } from 'react-router-dom'
import { connect } from 'react-redux';
import { login } from '../../redux/users/user'

class Login extends Component {
    constructor (props) {
        super (props)
        this.state= {
            username: '',
            password: ''
        }
        this.submitLogin = this.submitLogin.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    submitLogin (ev) {
        ev.preventDefault()
        const {
            state, props
        } = this
        const {
            username, password
        } = state
        const {
            login
        } = props
        if (!username || !password) {
            alert("Both username and password are required")
        } else {
            login(state)
            this.props.history.push("/play")
        }
    }
    handleChange(ev) {
        this.setState({
            [ev.target.name]: ev.target.value, 
        })
    }
    render () {
        const {
            state, props, handleChange, submitLogin
        } = this
        const {
            username, password
        } = state
        return (
            <div id= "welcome-box">
                <div id="welcome-message">
                  Welcome to T.R.I.V.I.A. Space Bounty Hunters!
                </div>
                <div id="user-details">
                    <form onSubmit={submitLogin}>
                        <label htmlFor="username">Username:</label>
                        <br />
                        <input name="username" type="text" value={username} onChange={handleChange} />
                        <br />
                        <label htmlFor="password">Password:</label>
                        <br />
                        <input name="password" type="password" value={password} onChange={handleChange} />
                        <br />
                        <button type="submit">Log In</button>
                    </form>
                </div>
                <div>
                    <Link to="/">Back</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
  login: (userInfo) => {
    dispatch(login(userInfo))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
