import { useMemo, useState } from 'react'
import QuestionEditor from './QuestionEditor.jsx'
import { getQuizzes, makeId, saveQuiz } from '../utils/storage.js'

function emptyQuestion() {
  return {
    id: makeId(),
    text: '',
    options: ['', ''],
    correctAnswer: '',
    marks: 1,
  }
}

function emptyForm() {
  return {
    title: '',
    subject: '',
    difficulty: 'Easy',
    duration: 10,
    questions: [emptyQuestion()],
  }
}

function QuizForm({ onCreated }) {
  const [form, setForm] = useState(emptyForm())
  const [error, setError] = useState('')
  const [titleTouched, setTitleTouched] = useState(false)

  const totalMarks = useMemo(
    () =>
      form.questions.reduce((sum, q) => sum + (Number(q.marks) || 0), 0),
    [form.questions],
  )

  const isDuplicateTitle = useMemo(() => {
    const title = form.title.trim().toLowerCase()
    if (!title) return false
    return getQuizzes().some((q) => q.title.trim().toLowerCase() === title)
  }, [form.title])

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function updateQuestion(index, updated) {
    setForm((prev) => {
      const questions = [...prev.questions]
      questions[index] = updated
      return { ...prev, questions }
    })
  }

  function addQuestion() {
    setForm((prev) => ({
      ...prev,
      questions: [...prev.questions, emptyQuestion()],
    }))
  }

  function removeQuestion(index) {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }))
  }

  function validate() {
    if (!form.title.trim()) return 'Quiz title is required.'
    if (isDuplicateTitle) return 'A quiz with this title already exists.'
    if (!form.subject.trim()) return 'Subject is required.'
    if (!form.duration || Number(form.duration) <= 0) {
      return 'Duration must be a positive number of minutes.'
    }
    if (form.questions.length === 0) return 'Add at least one question.'

    for (let i = 0; i < form.questions.length; i += 1) {
      const q = form.questions[i]
      if (!q.text.trim()) return `Question ${i + 1}: text is required.`
      const filledOptions = q.options.filter((o) => o.trim() !== '')
      if (filledOptions.length < 2) {
        return `Question ${i + 1}: add at least 2 options.`
      }
      if (!q.correctAnswer.trim()) {
        return `Question ${i + 1}: select the correct answer.`
      }
      if (!q.marks || Number(q.marks) <= 0) {
        return `Question ${i + 1}: marks must be greater than 0.`
      }
    }
    return ''
  }

  function handleSubmit(e) {
    e.preventDefault()
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }
    setError('')

    const quiz = {
      id: makeId(),
      title: form.title.trim(),
      subject: form.subject.trim(),
      difficulty: form.difficulty,
      duration: Number(form.duration),
      questions: form.questions.map((q) => ({
        ...q,
        options: q.options.filter((o) => o.trim() !== ''),
        marks: Number(q.marks),
      })),
      totalMarks,
      createdAt: Date.now(),
    }

    saveQuiz(quiz)
    setForm(emptyForm())
    setTitleTouched(false)
    onCreated?.()
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Create Quiz</h2>

      <div className="form-row">
        <label>
          Quiz Title
          <input
            type="text"
            className={titleTouched && isDuplicateTitle ? 'invalid' : ''}
            value={form.title}
            onChange={(e) => updateField('title', e.target.value)}
            onBlur={() => setTitleTouched(true)}
            placeholder="e.g. JavaScript Basics"
          />
          {titleTouched && isDuplicateTitle && (
            <p className="error-text">This title is already used.</p>
          )}
        </label>
        <label>
          Subject
          <input
            type="text"
            value={form.subject}
            onChange={(e) => updateField('subject', e.target.value)}
            placeholder="e.g. Web Development"
          />
        </label>
        <label>
          Difficulty
          <select
            value={form.difficulty}
            onChange={(e) => updateField('difficulty', e.target.value)}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </label>
        <label>
          Duration (minutes)
          <input
            type="number"
            min="1"
            value={form.duration}
            onChange={(e) => updateField('duration', e.target.value)}
          />
        </label>
      </div>

      <h3>Questions</h3>
      {form.questions.map((q, index) => (
        <QuestionEditor
          key={q.id}
          question={q}
          index={index}
          onChange={updateQuestion}
          onRemove={removeQuestion}
          canRemove={form.questions.length > 1}
        />
      ))}

      <button type="button" className="btn-secondary" onClick={addQuestion}>
        + Add Question
      </button>

      <p className="total-marks" style={{ marginTop: '1rem' }}>
        Total Marks: {totalMarks}
      </p>

      {error && <p className="error-text">{error}</p>}

      <button type="submit" className="btn-primary">
        Save Quiz
      </button>
    </form>
  )
}

export default QuizForm
