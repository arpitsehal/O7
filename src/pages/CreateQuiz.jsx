import { useNavigate } from 'react-router-dom'
import QuizForm from '../components/QuizForm.jsx'

function CreateQuiz() {
  const navigate = useNavigate()

  function handleCreated() {
    navigate('/')
  }

  return <QuizForm onCreated={handleCreated} />
}

export default CreateQuiz
