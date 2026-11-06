import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Timer from '../components/Timer.jsx'
import { getQuizById, makeId, saveResult } from '../utils/storage.js'
import { computeScore } from '../utils/scoring.js'

function TakeQuiz() {
  const { quizId } = useParams()
  const navigate = useNavigate()
  const quiz = useMemo(() => getQuizById(quizId), [quizId])

  const [studentName, setStudentName] = useState('')
  const [rollNo, setRollNo] = useState('')
  const [started, setStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const { scoredMarks } = useMemo(
    () => (quiz ? computeScore(quiz, answers) : { scoredMarks: 0 }),
    [quiz, answers],
  )

  if (!quiz) {
    return <div className="card">Quiz not found.</div>
  }

  function handleStart(e) {
    e.preventDefault()
    if (!studentName.trim() || !rollNo.trim()) return
    setStarted(true)
  }

  function selectAnswer(questionId, option) {
    setAnswers((prev) => ({ ...prev, [questionId]: option }))
  }

  function handleSubmit() {
    if (submitted) return
    setSubmitted(true)
    const { scoredMarks: finalScore, totalMarks, summary } = computeScore(
      quiz,
      answers,
    )
    const percentage = totalMarks > 0 ? (finalScore / totalMarks) * 100 : 0
    const result = {
      id: makeId(),
      quizId: quiz.id,
      quizTitle: quiz.title,
      subject: quiz.subject,
      difficulty: quiz.difficulty,
      studentName: studentName.trim(),
      rollNo: rollNo.trim(),
      totalMarks,
      scoredMarks: finalScore,
      percentage: Math.round(percentage * 100) / 100,
      passFail: percentage >= 40 ? 'Pass' : 'Fail',
      answers: summary,
      submittedAt: Date.now(),
    }
    saveResult(result)
    navigate(`/results/${result.id}`)
  }

  if (!started) {
    return (
      <form className="card" onSubmit={handleStart}>
        <h2>{quiz.title}</h2>
        <p>
          {quiz.subject} &middot; {quiz.difficulty} &middot; {quiz.duration}{' '}
          min &middot; {quiz.questions.length} questions &middot; Total Marks:{' '}
          {quiz.totalMarks}
        </p>
        <div className="form-row">
          <label>
            Student Name
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Your name"
            />
          </label>
          <label>
            Roll No
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              placeholder="Your roll number"
            />
          </label>
        </div>
        <button type="submit" className="btn-primary">
          Start Quiz
        </button>
      </form>
    )
  }

  const question = quiz.questions[currentIndex]
  const isLast = currentIndex === quiz.questions.length - 1

  return (
    <div className="card">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2>{quiz.title}</h2>
        <Timer
          totalSeconds={quiz.duration * 60}
          onExpire={handleSubmit}
        />
      </div>

      <p>
        Question {currentIndex + 1} of {quiz.questions.length} &middot; Live
        Score: <span className="live-score">{scoredMarks}</span> /{' '}
        {quiz.totalMarks}
      </p>

      <h3>{question.text}</h3>
      <div className="form-row" style={{ gridTemplateColumns: '1fr' }}>
        {question.options.map((opt) => (
          <div
            key={opt}
            className={`option-choice ${
              answers[question.id] === opt ? 'selected' : ''
            }`}
            onClick={() => selectAnswer(question.id, opt)}
          >
            <input
              type="radio"
              readOnly
              checked={answers[question.id] === opt}
            />
            {opt}
          </div>
        ))}
      </div>

      <div className="question-nav">
        {quiz.questions.map((q, i) => (
          <button
            key={q.id}
            type="button"
            className={`${answers[q.id] ? 'answered' : ''} ${
              i === currentIndex ? 'current' : ''
            }`}
            onClick={() => setCurrentIndex(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.6rem' }}>
        <button
          type="button"
          className="btn-secondary"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((i) => i - 1)}
        >
          Previous
        </button>
        {!isLast && (
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setCurrentIndex((i) => i + 1)}
          >
            Next
          </button>
        )}
        <button type="button" className="btn-primary" onClick={handleSubmit}>
          Submit Quiz
        </button>
      </div>
    </div>
  )
}

export default TakeQuiz
