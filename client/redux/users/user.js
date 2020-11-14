import axios from 'axios'
import { _loading, _loaded } from '../loading'

const LOGIN = "LOGIN"
const CREATE_USER = "CREATE_USER"
const CHECK_COOKIES = "CHECK_COOKIES"
const UPDATE_USER = "UPDATE_USER"

function _login (loginUser) {
    return {
        type: LOGIN,
        payload: loginUser
    }
}

function _createUser (newUser) {
    return {
        type: LOGIN,
        payload: newUser
    }
}

function _checkCookies (activeSessionUser) {
    return {
        type: CHECK_COOKIES,
        payload: activeSessionUser
    }
}

function _updateUser (user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function login (loginInfo) {
    return async (dispatch) => {
        try {
            dispatch(_loading())
            const response = await (axios.post('/api/auth/login', loginInfo))
            dispatch(_login(response.data))
            dispatch(_loaded())
        } catch (err) {
            console.error(err)
        }
    }
}

export function createUser (userInfo) {
    return async (dispatch) => {
        try {
            dispatch(_loading())
            const response = await (axios.post('/api/auth/create', userInfo))
            dispatch(_createUser(response.data))
            dispatch(_loaded())
        } catch (err) {
            console.error(err)
        }
    }
}

export function checkCookies () {
    return async (dispatch) => {
        try {
            dispatch(_loading())
            const response = await (axios.post('/api/auth/mount'))
            if (response) {
                dispatch(_checkCookies(response.data))
            }
            dispatch(_loaded())
        } catch (err) {
            console.error(err)
        }
    }
}

export function updateUser (userId, newUserInfo) {
    return async (dispatch) => {
        try {
            dispatch(_loading())
            const response = await (axios.put(`/api/users/${userId}`, newUserInfo))
            dispatch(_updateUser(response.data))
            dispatch(_loaded())
        } catch (err) {
            console.error(err)
        }
    }
}

export default function userReducer (state = {}, action) {
    if (action.type === LOGIN) {
      state = action.payload
    }
    if (action.type === CREATE_USER) {
        state = action.payload
    }
    if (action.type === CHECK_COOKIES) {
        state = action.payload
    }
    if (action.type === UPDATE_USER) {
        state = action.payload
    }
    return state
  }
  