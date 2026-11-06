import { useState } from 'react'
import QuizList from '../components/QuizList.jsx'
import { getQuizzes } from '../utils/storage.js'

function Quizzes() {
  const [quizzes] = useState(getQuizzes())

  return <QuizList quizzes={quizzes} />
}

export default Quizzes
