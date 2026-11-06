const QUIZZES_KEY = 'quiz-platform-quizzes'
const RESULTS_KEY = 'quiz-platform-results'

function read(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getQuizzes() {
  return read(QUIZZES_KEY)
}

export function saveQuiz(quiz) {
  const quizzes = getQuizzes()
  quizzes.push(quiz)
  write(QUIZZES_KEY, quizzes)
  return quizzes
}

export function deleteQuiz(quizId) {
  const quizzes = getQuizzes().filter((q) => q.id !== quizId)
  write(QUIZZES_KEY, quizzes)
  return quizzes
}

export function getQuizById(quizId) {
  return getQuizzes().find((q) => q.id === quizId) || null
}

export function getResults() {
  return read(RESULTS_KEY)
}

export function saveResult(result) {
  const results = getResults()
  results.push(result)
  write(RESULTS_KEY, results)
  return results
}

export function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}
