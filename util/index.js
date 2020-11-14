const decode = require('urldecode')

const shuffleAnswers = (question) => {
  const { correct_answer, incorrect_answers } = question
  const answerKey = []
  const answerKeyObj = {}
  answerKeyObj[Math.floor(Math.random() * 4)] = {
    id: 0,
    correct: true,
    answer: decode(correct_answer)
  }
  let wrongAnswerIndex = 3
  while (wrongAnswerIndex > 0) {
    const possibleKey = Math.floor(Math.random() * 4)
    if (!answerKeyObj[possibleKey]) {
      answerKeyObj[possibleKey] = {
        id: wrongAnswerIndex,
        correct: false,
        answer: decode(incorrect_answers[wrongAnswerIndex - 1])
      }
      wrongAnswerIndex--
    }
  }
  for (const answer in answerKeyObj) {
    answerKey.push(answerKeyObj[answer])
  }
  return answerKey
}

const formatQuestion = (question) => {
  return {
    category: decode(question.category),
    question: decode(question.question),
    answers: shuffleAnswers(question)
  }
}

export const formatAllQuestions = (questions) => {
  return questions.map((question) => formatQuestion(question))
}
