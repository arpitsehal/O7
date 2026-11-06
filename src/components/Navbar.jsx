import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <span className="brand">Quiz & Analytics Platform</span>
      <div className="nav-links">
        <NavLink to="/" end>
          Quizzes
        </NavLink>
        <NavLink to="/create">Create Quiz</NavLink>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
      </div>
    </nav>
  )
}

export default Navbar
