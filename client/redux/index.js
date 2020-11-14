import { combineReducers, createStore, applyMiddleware } from 'redux'
import axios from 'axios'
import thunkMiddleware from 'redux-thunk'
import loadingReducer from './loading'
import questionsReducer from './questions/questions'
import userReducer from './users/user'
import bountyReducer from './bounties/bounty'

const appReducer = combineReducers({
  loading: loadingReducer,
  user: userReducer,
  questions: questionsReducer,
  bounty: bountyReducer
})

const middleware = [
  thunkMiddleware.withExtraArgument({ axios })
]

export default createStore(
  appReducer,
  applyMiddleware(...middleware)
)
