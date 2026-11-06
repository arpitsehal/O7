import { Link, useParams } from 'react-router-dom'
import { getResults } from '../utils/storage.js'

function Results() {
  const { resultId } = useParams()
  const result = getResults().find((r) => r.id === resultId)

  if (!result) {
    return <div className="card">Result not found.</div>
  }

  return (
    <div>
      <div className="card">
        <h2>Quiz Summary</h2>
        <p>
          <strong>{result.studentName}</strong> (Roll No: {result.rollNo})
          &middot; {result.quizTitle}
        </p>
        <div className="form-row">
          <div>
            <p>Total Score</p>
            <p className="total-marks">
              {result.scoredMarks} / {result.totalMarks}
            </p>
          </div>
          <div>
            <p>Percentage</p>
            <p className="total-marks">{result.percentage}%</p>
          </div>
          <div>
            <p>Result</p>
            <p className={result.passFail === 'Pass' ? 'pass' : 'fail'}>
              {result.passFail}
            </p>
          </div>
        </div>
        <Link to="/leaderboard">
          <button type="button" className="btn-primary">
            View Leaderboard
          </button>
        </Link>
      </div>

      <div className="card">
        <h3>Answer Breakdown</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Question</th>
                <th>Your Answer</th>
                <th>Correct Answer</th>
                <th>Marks Earned</th>
              </tr>
            </thead>
            <tbody>
              {result.answers.map((row) => (
                <tr
                  key={row.questionId}
                  className={
                    row.isCorrect
                      ? 'summary-row-correct'
                      : 'summary-row-wrong'
                  }
                >
                  <td>{row.questionText}</td>
                  <td>{row.userAnswer ?? 'Not answered'}</td>
                  <td>{row.correctAnswer}</td>
                  <td>
                    {row.earned} / {row.marks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Results
