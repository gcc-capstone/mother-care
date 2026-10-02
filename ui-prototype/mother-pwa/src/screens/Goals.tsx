import { Page } from '../components/Page'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

import checkCircleIcon from '../assets/icons/check-circle.svg'
import chevronIcon from '../assets/icons/chevron-down.svg'
import plusIcon from '../assets/icons/plus.svg'
import { type Goal } from '../data/goals'
import { useMotherState } from '../hooks/useMotherState'

function GoalList({ goals, onToggle }: { goals: Goal[]; onToggle: (id: string) => void }) {
  return (
    <ul className="m-0 list-none overflow-hidden rounded-[20px] bg-white p-0 [&>li+li]:border-t [&>li+li]:border-[var(--border)]">
      {goals.map((g) => (
        <li key={g.id} className="flex items-center">
          <label className="group flex min-h-14 min-w-0 flex-1 cursor-pointer items-center gap-3 px-4 py-3.5">
            <input
              type="checkbox"
              className="size-[22px] shrink-0 cursor-pointer accent-[var(--ink)]"
              checked={g.done}
              disabled={Boolean(g.credits && g.done)}
              onChange={() => onToggle(g.id)}
            />
            <span className="flex min-w-0 flex-1 flex-col gap-px">
              <span className="text-[15px] font-semibold text-[var(--ink)] group-has-[:checked]:text-[var(--muted)] group-has-[:checked]:line-through">{g.title}</span>
              <span className="text-[13px] leading-snug text-[var(--muted)] whitespace-pre-wrap">
                {g.due ? `${g.source}  ·  ${g.due}` : g.source}
              </span>
            </span>
          </label>
          <Link to={`/goals/${g.id}`} aria-label={`Details for ${g.title}`} className="flex min-h-11 shrink-0 items-center px-3 text-sm font-semibold text-[var(--ink)] underline">Details</Link>
        </li>
      ))}
    </ul>
  )
}

export default function Goals() {
  const { goals, setGoals, completeOpportunity, streakDays } = useMotherState()
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
    const goal = goals.find(g => g.id === id)
    if (goal?.credits && !goal.done) { completeOpportunity(id); return }
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
    <Page title="Goals">

      <section className="flex flex-col gap-3 rounded-[20px] bg-white px-[18px] pb-[18px] pt-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[19px] font-semibold text-[var(--ink)]">
            {todayDone} of {todayGoals.length} done today
          </p>
          <span className="rounded-full bg-[var(--sage-strip)] px-[11px] py-[5px] text-xs font-semibold text-[var(--sage)]">{streakDays} day streak</span>
        </div>
        <div
          className="h-2.5 overflow-hidden rounded-full bg-[var(--mood-okay)]"
          role="progressbar"
          aria-label="Today’s goal progress"
          aria-valuenow={todayDone}
          aria-valuemin={0}
          aria-valuemax={todayGoals.length || 1}
        >
          <div className="h-full rounded-full bg-[var(--sage)] transition-transform motion-reduce:transition-none" style={{ transform: `translateX(${progress - 100}%)` }} />
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold leading-snug">Today</h2>
        {openToday.length ? (
          <GoalList goals={openToday} onToggle={toggle} />
        ) : (
          <p className="text-[13px] leading-snug text-[var(--muted)] py-1">All done for today.</p>
        )}
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold leading-snug">This week</h2>
        {openWeek.length ? (
          <GoalList goals={openWeek} onToggle={toggle} />
        ) : (
          <p className="text-[13px] leading-snug text-[var(--muted)] py-1">Nothing left this week.</p>
        )}
      </section>

      <section className="flex flex-col overflow-hidden rounded-[20px] bg-[var(--sage-strip)]">
        <button
          className="group flex min-h-11 items-center justify-between px-4 py-3.5"
          aria-expanded={showCompleted}
          onClick={() => setShowCompleted((v) => !v)}
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-[var(--ink)]">
            <img src={checkCircleIcon} width={18} height={18} alt="" />
            Completed goals ({completed.length})
          </span>
          <img className="transition-transform group-aria-expanded:rotate-180" src={chevronIcon} width={16} height={16} alt="" />
        </button>
        {showCompleted && (completed.length ? <GoalList goals={completed} onToggle={toggle} /> : <p className="p-4 text-sm">No completed goals yet.</p>)}
      </section>

      {adding ? (
        <form className="flex flex-col gap-2.5 rounded-[20px] bg-white p-4" onSubmit={addGoal}>
          <input
            autoFocus
            className="rounded-xl border border-[var(--border)] px-3.5 py-3 text-[15px]"
            aria-label="New goal title"
            maxLength={120}
            placeholder="What do you want to work on?"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && setAdding(false)}
          />
          <div className="flex justify-end gap-2">
            <button type="button" className="inline-flex min-h-11 items-center justify-center rounded-full font-semibold leading-snug disabled:cursor-not-allowed disabled:opacity-40 self-start border border-[var(--ink)] px-[18px] py-2.5 text-sm text-[var(--ink)]" onClick={() => setAdding(false)}>
              Cancel
            </button>
            <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full font-semibold leading-snug disabled:cursor-not-allowed disabled:opacity-40 bg-[var(--ink)] px-[18px] py-2.5 text-sm text-white" disabled={!draft.trim()}>
              Add goal
            </button>
          </div>
        </form>
      ) : (
        <button className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-dashed border-[var(--ink)] p-3 text-[15px] font-semibold text-[var(--ink)]" onClick={() => setAdding(true)}>
          <img src={plusIcon} width={16} height={16} alt="" />
          Add my own goal
        </button>
      )}
    </Page>
  )
}
