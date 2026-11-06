import { useMemo, useState } from 'react'
import { getResults } from '../utils/storage.js'

function rankResults(results) {
  const sorted = [...results].sort((a, b) => {
    if (b.scoredMarks !== a.scoredMarks) return b.scoredMarks - a.scoredMarks
    return b.percentage - a.percentage
  })
  return sorted.map((r, i) => ({ ...r, rank: i + 1 }))
}

function subjectAnalytics(results) {
  const bySubject = {}
  results.forEach((r) => {
    if (!bySubject[r.subject]) bySubject[r.subject] = { total: 0, count: 0 }
    bySubject[r.subject].total += r.percentage
    bySubject[r.subject].count += 1
  })
  return Object.entries(bySubject).map(([subject, { total, count }]) => ({
    subject,
    avgPercentage: Math.round((total / count) * 100) / 100,
  }))
}

function Leaderboard() {
  const results = useMemo(() => getResults(), [])
  const [subjectFilter, setSubjectFilter] = useState('All')
  const [difficultyFilter, setDifficultyFilter] = useState('All')

  const subjects = useMemo(
    () => ['All', ...new Set(results.map((r) => r.subject))],
    [results],
  )
  const difficulties = useMemo(
    () => ['All', ...new Set(results.map((r) => r.difficulty))],
    [results],
  )

  const filtered = useMemo(() => {
    return results.filter((r) => {
      const subjectOk = subjectFilter === 'All' || r.subject === subjectFilter
      const difficultyOk =
        difficultyFilter === 'All' || r.difficulty === difficultyFilter
      return subjectOk && difficultyOk
    })
  }, [results, subjectFilter, difficultyFilter])

  const ranked = useMemo(() => rankResults(filtered), [filtered])
  const analytics = useMemo(() => subjectAnalytics(filtered), [filtered])
  const maxAvg = Math.max(1, ...analytics.map((a) => a.avgPercentage))

  return (
    <div>
      <div className="card">
        <h2>Leaderboard</h2>
        <div className="filters">
          <label>
            Subject
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
            >
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label>
            Difficulty
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              {difficulties.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>
        </div>

        {ranked.length === 0 ? (
          <div className="empty-state">
            No results yet. Take a quiz to appear on the leaderboard.
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Score</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((r) => (
                  <tr key={r.id}>
                    <td className={r.rank === 1 ? 'rank-1' : ''}>
                      #{r.rank}
                    </td>
                    <td>
                      {r.studentName} ({r.rollNo})
                    </td>
                    <td>{r.subject}</td>
                    <td>
                      {r.scoredMarks} / {r.totalMarks}
                    </td>
                    <td>{r.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {analytics.length > 0 && (
        <div className="card">
          <h3>Average Score by Subject</h3>
          {analytics.map((a) => (
            <div key={a.subject} style={{ marginBottom: '0.6rem' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.85rem',
                  marginBottom: '0.2rem',
                }}
              >
                <span>{a.subject}</span>
                <span>{a.avgPercentage}%</span>
              </div>
              <div
                style={{
                  background: '#e2e8f0',
                  borderRadius: '6px',
                  height: '10px',
                }}
              >
                <div
                  style={{
                    width: `${(a.avgPercentage / maxAvg) * 100}%`,
                    background: '#2563eb',
                    height: '100%',
                    borderRadius: '6px',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Leaderboard
