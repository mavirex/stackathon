import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getQuestions } from '../../redux/questions/questions'
import { updateUser } from '../../redux/users/user'
import { completeBounty } from '../../redux/bounties/bounty'

class Question extends Component {
  constructor (props) {
    super(props)
    this.state = {
      timer: this.props.user.rank.timer,
      right: 0,
      wrong: 0,
      removedAnswers: [],
      quantumBlasts: this.props.user.quantumBlasts,
      currentQuestion: 0,
      points: 0
    }
    this.answerQuestion = this.answerQuestion.bind(this)
    this.countDown = this.countDown.bind(this)
    this.removeWrongAnswer = this.removeWrongAnswer.bind(this)
    this.returnToMainMenu = this.returnToMainMenu.bind(this)
  }

  componentDidMount () {
    document.addEventListener('keydown', this.onKeyDown.bind(this))
    const { getQuestions } = this.props
    getQuestions()
    this.clock = setInterval(
      () => this.countDown(),
      1000
    )
    console.log("This bad boy is running somewhere")
  }

  componentWillUnmount () {
    clearInterval(this.clock)
    document.removeEventListener('keydown', this.onKeyDown.bind(this))
  }

  onKeyDown (ev) {
    if (ev.keyCode === 32) {
      document.getElementById('quantumBlasts').click()
    } else if (ev.keyCode === 49) {
      document.getElementById('button-0').click()
    } else if (ev.keyCode === 50) {
      document.getElementById('button-1').click()
    } else if (ev.keyCode === 51) {
      document.getElementById('button-2').click()
    } else if (ev.keyCode === 52) {
      document.getElementById('button-3').click()
    }
  }

  countDown () {
    const { timer } = this.state
    if (timer <= 0) {
      this.answerQuestion(false)
    } else {
      const newTime = timer - 1
      this.setState({
        timer: newTime
      })
    }
  }

  answerQuestion (correct) {
    clearInterval(this.clock)
    if (correct) {
      const points = this.state.points + 10
      const right = this.state.right + 1
      this.setState({
        right,
        points
      })
    } else {
      const wrong = this.state.wrong + 1
      this.setState({
        wrong
      })
    }
    let nextQuestion = this.state.currentQuestion + 1
    if (nextQuestion <= this.props.questions.length - 1) {
      this.setState({
        timer: 8,
        removedAnswers: [],
        currentQuestion: nextQuestion
      })
      this.clock = setInterval(
        () => this.countDown(),
        1000
      )
    } else {
      nextQuestion = nextQuestion + 1
      this.setState({
        currentQuestion: nextQuestion
      })
    }
  }

  removeWrongAnswer () {
    const { removedAnswers, quantumBlasts } = this.state
    if (removedAnswers.length < 3 && quantumBlasts > 0) {
      let rando = Math.ceil(Math.random() * 3)
      while (removedAnswers.includes(rando)) {
        rando = Math.ceil(Math.random() * 3)
      }
      const newQuantumBlasts = quantumBlasts - 1
      removedAnswers.push(rando)
      this.setState({
        removedAnswers,
        quantumBlasts: newQuantumBlasts
      })
    }
  }

  returnToMainMenu () {
    const { props, state } = this
    const { user, updateUser, completeBounty } = props
    const { points, quantumBlasts } = state
    const credits = user.credits + 500
    const dailyScore = user.dailyScore + points
    const weeklyScore = user.weeklyScore + points
    const merit = user.merit + points
    updateUser(user.id, {
      credits,
      dailyScore,
      weeklyScore,
      merit,
      quantumBlasts
    })
    completeBounty()
  }

  render () {
    const {
      answerQuestion, removeWrongAnswer, returnToMainMenu, props, state
    } = this
    const { questions, user } = props
    const {
      timer, right, wrong, removedAnswers, quantumBlasts, currentQuestion
    } = state
    if (questions.length && currentQuestion >= questions.length) {
      if (right >= user.rank.markHits) {
        return (
          <div id="results-box">
            <div>Congratulations! You beat the mark in T.R.I.V.I.A and captured them!</div>
            <button onClick={returnToMainMenu}>Return to Main Menu</button>
          </div>
        )
      } else {
        return (
          <div id="results-box">
            <div>The mark beat you in T.R.I.V.I.A and got away...</div>
            <button onClick={returnToMainMenu}>Return to Main Menu</button>
          </div>
        )
      }
    } else {
      return (
        <div id='trivia-box' onKeyDown={this.onKeyDown}>
          <div id='question-box'>
            {
                          questions[currentQuestion]
                            ? <div id='questionsAndAnswers'>
                              <div id='question'>{questions[currentQuestion].question}</div>
                              <div id='answers'>
                                <ol>
                                  {
                                              questions[currentQuestion].answers.map((answer) => (
                                                removedAnswers.includes(answer.id)
                                                  ? <li key={answer.id} className='removedAnswer'>{answer.answer}</li>
                                                  : <li
                                                      key={answer.id} className='availableAnswer'
                                                      id={`button-${questions[currentQuestion].answers.indexOf(answer)}`}
                                                      onClick={() => answerQuestion(answer.correct)}
                                                    >
                                                    {answer.answer}
                                                  </li>
                                              ))
                                          }
                                </ol>
                              </div>
                            </div>
                            : 
                            <div>Loading questions...</div>
                      }
          </div>
          <div id='quantumBlasts' onClick={removeWrongAnswer}>
            <div id='qbMainText'>Quantum Blast!</div>
            <div>{quantumBlasts} remaining</div>
          </div>
          <div id='hitAndMiss'>
            <div id='hit'>
              <div>Hit</div>
              <div>{right}</div>
            </div>
            <div id='timer'>
              <div>Timer</div>
              <div>{timer}</div>
            </div>
            <div id='miss'>
              <div>Miss</div>
              <div>{wrong}</div>
            </div>
          </div>
          <div id='correctAnswersNeeded'>
            <div>Correct Answers Needed: {user.rank.markHits}</div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  questions: state.questions
})

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => {
    dispatch(getQuestions())
  },
  updateUser: (userId, newUserInfo) => {
    dispatch(updateUser(userId, newUserInfo))
  },
  completeBounty: () => {
    dispatch(completeBounty())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Question)
