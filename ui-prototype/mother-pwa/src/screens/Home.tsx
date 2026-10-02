import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

import bellIcon from '../assets/icons/bell.svg'
import avatarIcon from '../assets/icons/avatar.svg'
import { moods, recommended, today, todaysGoals, user } from '../data/home'

export default function Home() {
  const [mood, setMood] = useState<string | null>(null)
  const [goals, setGoals] = useState(todaysGoals)

  const doneCount = goals.filter((g) => g.done).length

  function toggleGoal(id: string) {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, done: !g.done } : g)))
  }

  return (
    <main className="screen home">
      <header className="home-header">
        <div className="home-greeting">
          <h1 className="text-heading">Good morning, {user.firstName}</h1>
          <p className="text-caption">{today}</p>
        </div>
        <button
          className="home-bell"
          aria-label={`Notifications, ${user.unreadNotifications} unread`}
        >
          <img src={bellIcon} width={22} height={22} alt="" />
          <span className="home-bell-badge">{user.unreadNotifications}</span>
        </button>
        <img className="home-avatar" src={avatarIcon} width={44} height={44} alt="Profile" />
      </header>

      <section className="card mood-card">
        <h2 className="text-subhead">How are you feeling today?</h2>
        <div className="mood-options" role="radiogroup" aria-label="Mood">
          {moods.map((m) => (
            <button
              key={m.id}
              className="mood-option"
              role="radio"
              aria-checked={mood === m.id}
              onClick={() => setMood(m.id)}
            >
              <span className="mood-face" style={{ background: m.color }}>
                <img src={m.icon} width={26} height={26} alt="" />
              </span>
              <span className="text-caption">{m.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2 className="text-subhead">Today's goals</h2>
          <p className="text-caption">
            {doneCount} of {goals.length} done
          </p>
        </div>
        <ul className="card goal-list">
          {goals.map((g) => (
            <li key={g.id}>
              <label className={`goal-row${g.done ? ' is-done' : ''}`}>
                <input
                  type="checkbox"
                  className="goal-check"
                  checked={g.done}
                  onChange={() => toggleGoal(g.id)}
                />
                <span className="text-body goal-title">{g.title}</span>
                {g.credits ? <span className="credit-chip">+{g.credits}</span> : null}
              </label>
            </li>
          ))}
        </ul>
      </section>

      <Link to="/earn" className="credits-strip">
        <div className="credits-balance">
          <p className="text-subhead">{user.credits} credits</p>
          <p className="text-caption">Enough for a pack of diapers</p>
        </div>
        <span className="credits-link">Visit store&nbsp;&nbsp;&gt;</span>
      </Link>

      <section className="section">
        <h2 className="text-subhead">Recommended for you</h2>
        <div className="rec-scroller">
          {recommended.map((r) => (
            <Link key={r.id} to={r.to} className="card rec-card">
              <img className="rec-image" src={r.image} alt="" />
              <div className="rec-text">
                <p className="text-body rec-title">{r.title}</p>
                <p className="text-caption rec-detail">{r.detail}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
