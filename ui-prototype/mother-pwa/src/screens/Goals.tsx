import { useState, type FormEvent } from 'react'
import './Goals.css'

import checkCircleIcon from '../assets/icons/check-circle.svg'
import chevronIcon from '../assets/icons/chevron-down.svg'
import plusIcon from '../assets/icons/plus.svg'
import { initialGoals, streakDays, type Goal } from '../data/goals'

function GoalList({ goals, onToggle }: { goals: Goal[]; onToggle: (id: string) => void }) {
  return (
    <ul className="goal-card">
      {goals.map((g) => (
        <li key={g.id}>
          <label className={`goals-row${g.done ? ' is-done' : ''}`}>
            <input
              type="checkbox"
              className="goals-check"
              checked={g.done}
              onChange={() => onToggle(g.id)}
            />
            <span className="goals-text">
              <span className="goals-title">{g.title}</span>
              <span className="text-caption goals-source">
                {g.due ? `${g.source}  ·  ${g.due}` : g.source}
              </span>
            </span>
          </label>
        </li>
      ))}
    </ul>
  )
}

export default function Goals() {
  const [goals, setGoals] = useState(initialGoals)
  const [showCompleted, setShowCompleted] = useState(false)
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState('')

  const todayGoals = goals.filter((g) => g.when === 'today')
  const todayDone = todayGoals.filter((g) => g.done).length
  const openToday = todayGoals.filter((g) => !g.done)
  const openWeek = goals.filter((g) => g.when === 'week' && !g.done)
  const completed = goals.filter((g) => g.done)
  const progress = todayGoals.length ? (todayDone / todayGoals.length) * 100 : 0

  function toggle(id: string) {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, done: !g.done } : g)))
  }

  function addGoal(e: FormEvent) {
    e.preventDefault()
    const title = draft.trim()
    if (!title) return
    setGoals((prev) => [
      ...prev,
      { id: `own-${Date.now()}`, title, source: 'Added by you', when: 'week', done: false },
    ])
    setDraft('')
    setAdding(false)
  }

  return (
    <main className="screen goals">
      <h1 className="text-heading">Goals</h1>

      <section className="progress-card">
        <div className="progress-top">
          <p className="progress-label">
            {todayDone} of {todayGoals.length} done today
          </p>
          <span className="streak-chip">{streakDays} day streak</span>
        </div>
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow={todayDone}
          aria-valuemin={0}
          aria-valuemax={todayGoals.length}
        >
          <div className="progress-fill" style={{ transform: `translateX(${progress - 100}%)` }} />
        </div>
      </section>

      <section className="goals-section">
        <h2 className="text-subhead">Today</h2>
        {openToday.length ? (
          <GoalList goals={openToday} onToggle={toggle} />
        ) : (
          <p className="text-caption goals-empty">All done for today.</p>
        )}
      </section>

      <section className="goals-section">
        <h2 className="text-subhead">This week</h2>
        {openWeek.length ? (
          <GoalList goals={openWeek} onToggle={toggle} />
        ) : (
          <p className="text-caption goals-empty">Nothing left this week.</p>
        )}
      </section>

      <section className="completed">
        <button
          className="completed-toggle"
          aria-expanded={showCompleted}
          onClick={() => setShowCompleted((v) => !v)}
        >
          <span className="completed-label">
            <img src={checkCircleIcon} width={18} height={18} alt="" />
            Completed today ({completed.length})
          </span>
          <img className="completed-chevron" src={chevronIcon} width={16} height={16} alt="" />
        </button>
        {showCompleted && completed.length > 0 && <GoalList goals={completed} onToggle={toggle} />}
      </section>

      {adding ? (
        <form className="add-goal-form" onSubmit={addGoal}>
          <input
            autoFocus
            className="add-goal-input"
            placeholder="What do you want to work on?"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && setAdding(false)}
          />
          <div className="add-goal-actions">
            <button type="button" className="btn btn-outline" onClick={() => setAdding(false)}>
              Cancel
            </button>
            <button type="submit" className="btn add-goal-save" disabled={!draft.trim()}>
              Add goal
            </button>
          </div>
        </form>
      ) : (
        <button className="add-goal" onClick={() => setAdding(true)}>
          <img src={plusIcon} width={16} height={16} alt="" />
          Add my own goal
        </button>
      )}
    </main>
  )
}
