import React, { Component } from 'react';
import {
    Link
  } from 'react-router-dom'
import { connect } from 'react-redux';
import { createUser } from '../../redux/users/user'

class Signup extends Component {
    constructor (props) {
        super (props)
        this.state= {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: ''
        }
        this.submitUser = this.submitUser.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    submitUser (ev) {
        ev.preventDefault()
        const {
            state, props
        } = this
        const {
            firstName, lastName, email, username, password
        } = state
        const {
            createUser
        } = props
        if (
            !firstName || !lastName || !email|| !username || !password
        ) {
            alert("All fields are required")
        } else {
            createUser(state)
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
            state, props, handleChange, submitUser
        } = this
        const {
            firstName, lastName, email, username, password
        } = state
        return (
            <div id= "welcome-box">
                <div id="welcome-message">
                  Welcome to T.R.I.V.I.A. Space Bounty Hunters!
                </div>
                <div id="user-details">
                    <form onSubmit={submitUser}>
                        <label htmlFor="firstName">First Name:</label>
                        <br />
                        <input name="firstName" type="text" value={firstName} onChange={handleChange} />
                        <br />
                        <label htmlFor="lastName">Last Name:</label>
                        <br />
                        <input name="lastName" type="text" value={lastName} onChange={handleChange} />
                        <br />
                        <label htmlFor="email">Email:</label>
                        <br />
                        <input name="email" type="text" value={email} onChange={handleChange} />
                        <br />
                        <label htmlFor="username">Username:</label>
                        <br />
                        <input name="username" type="text" value={username} onChange={handleChange} />
                        <br />
                        <label htmlFor="password">Password:</label>
                        <br />
                        <input name="password" type="text" value={password} onChange={handleChange} />
                        <br />
                        <button type="submit">Create Account</button>
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
  createUser: (userInfo) => {
    dispatch(createUser(userInfo))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
