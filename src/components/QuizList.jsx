import { Link } from 'react-router-dom'

const badgeClass = {
  Easy: 'badge-easy',
  Medium: 'badge-medium',
  Hard: 'badge-hard',
}

function QuizList({ quizzes }) {
  if (quizzes.length === 0) {
    return (
      <div className="card empty-state">
        No quizzes yet. Use "Create Quiz" in the nav bar to get started.
      </div>
    )
  }

  return (
    <div className="card">
      <h2>Available Quizzes</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Subject</th>
              <th>Difficulty</th>
              <th>Duration</th>
              <th>Questions</th>
              <th>Total Marks</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz.id}>
                <td>{quiz.title}</td>
                <td>{quiz.subject}</td>
                <td>
                  <span className={`badge ${badgeClass[quiz.difficulty]}`}>
                    {quiz.difficulty}
                  </span>
                </td>
                <td>{quiz.duration} min</td>
                <td>{quiz.questions.length}</td>
                <td>{quiz.totalMarks}</td>
                <td>
                  <Link to={`/quiz/${quiz.id}`}>
                    <button type="button" className="btn-primary">
                      Take Quiz
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default QuizList
