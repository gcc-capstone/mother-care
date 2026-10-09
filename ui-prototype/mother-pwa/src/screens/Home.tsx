import HomeUpdates from '../components/HomeUpdates'
import { Page } from '../components/Page'
import { useMotherState } from '../hooks/useMotherState'
import { Link } from 'react-router-dom'

import bellIcon from '../assets/icons/bell.svg'
import avatarIcon from '../assets/icons/avatar.svg'
import { moods, recommended, today } from '../data/home'

export default function Home() {
  const { mood, setMood, goals: allGoals, setGoals, profile: user, credits, notifications, completeOpportunity } = useMotherState()
  const goals = allGoals.filter(g => g.when === 'today')

  const doneCount = goals.filter((g) => g.done).length

  function toggleGoal(id: string) {
    const goal = goals.find(g => g.id === id)
    if (goal?.credits && !goal.done) { completeOpportunity(id); return }
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, done: !g.done } : g)))
  }

  return (
    <Page>
      <header className="flex items-center gap-2">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h1 className="text-2xl font-semibold leading-tight text-[var(--ink)]">Good morning, {user.firstName}</h1>
          <p className="text-[13px] leading-snug text-[var(--muted)]">{today}</p>
        </div>
        <Link to="/notifications"
          className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-white"
          aria-label={`Notifications, ${notifications.length} unread`}
        >
          <img src={bellIcon} width={22} height={22} alt="" />
          <span className="absolute left-6 top-0.5 min-w-[21px] rounded-full border-2 border-[var(--bg)] bg-[var(--alert)] px-[5px] py-0.5 text-center text-[11px] font-semibold text-white">{notifications.length}</span>
        </Link>
        <Link to="/profile" aria-label="Edit profile"><img className="shrink-0" src={avatarIcon} width={44} height={44} alt="" /></Link>
      </header>


      <section className="overflow-hidden rounded-2xl bg-white flex flex-col gap-3.5 p-4">
        <h2 className="text-lg font-semibold leading-snug">How are you feeling today?</h2>
        <div className="flex justify-between gap-1" role="group" aria-label="Mood">
          {moods.map((m) => (
            <button
              key={m.id}
              className="group flex min-w-11 flex-col items-center gap-1.5 aria-pressed:font-semibold aria-pressed:text-[var(--ink)]"
              aria-pressed={mood === m.id}
              onClick={() => { setMood(m.id); setGoals(prev => prev.map(g => g.id === 'log-mood' ? { ...g, done: true } : g)) }}
            >
              <span className={`flex size-11 items-center justify-center rounded-full group-aria-pressed:ring-2 group-aria-pressed:ring-[var(--ink)] group-aria-pressed:ring-offset-2 ${m.color}`}>
                <img src={m.icon} width={26} height={26} alt="" />
              </span>
              <span className="text-[13px] leading-snug text-[var(--muted)]">{m.label}</span>
            </button>
          ))}
        </div>
      </section>

      <HomeUpdates />

      <section className="flex flex-col gap-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold leading-snug">Today's goals</h2>
          <p className="text-[13px] leading-snug text-[var(--muted)]">
            {doneCount} of {goals.length} done
          </p>
        </div>
        <ul className="overflow-hidden rounded-2xl bg-white m-0 list-none p-0 [&>li+li]:border-t [&>li+li]:border-[var(--border)]">
          {goals.map((g) => (
            <li key={g.id}>
              <label className="group flex min-h-14 cursor-pointer items-center gap-3 p-4">
                <input
                  type="checkbox"
                  className="size-[22px] shrink-0 cursor-pointer accent-[var(--ink)]"
                  checked={g.done}
                  disabled={Boolean(g.credits && g.done)}
                  onChange={() => toggleGoal(g.id)}
                />
                <span className="text-[15px] leading-relaxed min-w-0 flex-1 group-has-[:checked]:text-[var(--muted)] group-has-[:checked]:line-through">{g.title}</span>
                {g.credits ? <span className="shrink-0 rounded-full bg-[var(--sage-bg)] px-2.5 py-1 text-[13px] text-[var(--sage)]">+{g.credits}</span> : null}
              </label>
            </li>
          ))}
        </ul>
        {!goals.length && <p className="rounded-2xl bg-white p-4 text-sm">No goals for today. Visit Goals to add your own.</p>}
      </section>

      <Link to="/store" className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-[var(--sage-strip)] p-4">
        <div className="flex flex-col gap-0.5">
          <p className="text-lg font-semibold leading-snug">{credits} credits</p>
          <p className="text-[13px] leading-snug text-[var(--muted)]">{credits >= 12 ? 'Enough for a pack of diapers' : 'Keep earning toward baby essentials'}</p>
        </div>
        <span className="min-h-11 content-center text-[13px] font-medium text-[var(--ink)]">Visit store&nbsp;&nbsp;&gt;</span>
      </Link>

      <section className="flex flex-col gap-2.5">
        <h2 className="text-lg font-semibold leading-snug">Recommended for you</h2>
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1">
          {recommended.map((r) => (
            <Link key={r.id} to={r.to} className="overflow-hidden rounded-2xl bg-white flex w-[200px] shrink-0 snap-start flex-col">
              <img className="h-20 w-full object-cover" src={r.image} alt="" />
              <div className="flex flex-col gap-1 px-3 pb-3.5 pt-3">
                <p className="text-[15px] leading-relaxed ">{r.title}</p>
                <p className="text-[13px] leading-snug text-[var(--muted)] ">{r.detail}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Page>
  )
}
