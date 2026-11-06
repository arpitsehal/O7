export function buildAnswerSummary(quiz, answers) {
  return quiz.questions.map((q) => {
    const userAnswer = answers[q.id] ?? null
    const isCorrect = userAnswer !== null && userAnswer === q.correctAnswer
    return {
      questionId: q.id,
      questionText: q.text,
      options: q.options,
      userAnswer,
      correctAnswer: q.correctAnswer,
      marks: q.marks,
      earned: isCorrect ? q.marks : 0,
      isCorrect,
    }
  })
}

export function computeScore(quiz, answers) {
  const summary = buildAnswerSummary(quiz, answers)
  const scoredMarks = summary.reduce((sum, row) => sum + row.earned, 0)
  return { scoredMarks, totalMarks: quiz.totalMarks, summary }
}

export const PASS_PERCENTAGE = 40
