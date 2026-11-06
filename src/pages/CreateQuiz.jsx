import { useState } from 'react'
import QuizForm from '../components/QuizForm.jsx'
import QuizList from '../components/QuizList.jsx'
import { getQuizzes } from '../utils/storage.js'

function CreateQuiz() {
  const [quizzes, setQuizzes] = useState(getQuizzes())

  function refresh() {
    setQuizzes(getQuizzes())
  }

  return (
    <div>
      <QuizForm onCreated={refresh} />
      <QuizList quizzes={quizzes} />
    </div>
  )
}

export default CreateQuiz
