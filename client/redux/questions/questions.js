import axios from 'axios'
import { formatAllQuestions } from '../../../util'
import { _loading, _loaded } from '../loading'

const GET_QUESTIONS = 'GET_QUESTIONS'

function _getQuestions (questions) {
  return {
    type: GET_QUESTIONS,
    payload: questions
  }
}

export function getQuestions (difficulty) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple&encode=url3986`)
      dispatch(_getQuestions(formatAllQuestions(response.data.results)))
    } catch (err) {
      console.error(err)
    }
  }
}

export default function questionsReducer (state = [], action) {
  if (action.type === GET_QUESTIONS) {
    state = action.payload
  }
  return state
}
