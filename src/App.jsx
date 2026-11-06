import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import CreateQuiz from './pages/CreateQuiz.jsx'
import TakeQuiz from './pages/TakeQuiz.jsx'
import Results from './pages/Results.jsx'
import Leaderboard from './pages/Leaderboard.jsx'

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page">
        <Routes>
          <Route path="/" element={<CreateQuiz />} />
          <Route path="/create" element={<CreateQuiz />} />
          <Route path="/quiz/:quizId" element={<TakeQuiz />} />
          <Route path="/results/:resultId" element={<Results />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
