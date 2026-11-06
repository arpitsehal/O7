# Interactive Quiz & Analytics Platform

A React + Vite app for creating quizzes, taking them under a countdown timer,
and viewing scored results on a leaderboard with basic analytics. Data is
persisted in the browser via `localStorage` (no backend required).

## Features

- **Quiz builder** — title, subject, difficulty, duration, and a dynamic list
  of questions (text, options, correct answer, marks). Total marks update
  live as questions are added/removed. Duplicate quiz titles are blocked.
- **Quiz taking** — student name/roll entry, one question at a time with a
  question navigator, a countdown timer that auto-submits on expiry, and a
  live score that updates as answers are selected.
- **Score summary** — total score, percentage, pass/fail, and a per-question
  breakdown (your answer vs. correct answer vs. marks earned). Unanswered
  questions are handled gracefully.
- **Leaderboard & analytics** — results ranked by score (percentage as
  tiebreaker), filterable by subject/difficulty, plus a simple average-score
  bar chart per subject.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. Build for production with `npm run build`.

## Project structure

```
src/
  components/   QuestionEditor, QuizForm, QuizList, Timer, Navbar
  pages/        CreateQuiz, TakeQuiz, Results, Leaderboard
  utils/        storage.js (localStorage), scoring.js (score/summary logic)
```
