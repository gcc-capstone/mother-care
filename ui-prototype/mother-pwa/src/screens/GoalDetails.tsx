import { useParams } from 'react-router-dom'
import { ActionLink, MissingRecord, Page, PrimaryButton } from '../components/Page'
import { opportunities } from '../data/earn'
import { useMotherState } from '../hooks/useMotherState'

export default function GoalDetails() {
  const { id } = useParams()
  const { goals, setGoals, completeOpportunity } = useMotherState()
  const goal = goals.find(g => g.id === id)
  if (!goal) return <MissingRecord back="/goals" />
  const opportunity = opportunities.find(o => o.id === goal.id)
  function toggle() {
    if (!goal || (goal.credits && goal.done)) return
    if (goal.credits) completeOpportunity(goal.id)
    else setGoals(prev => prev.map(g => g.id === goal.id ? { ...g, done: !g.done } : g))
  }
  return <Page title={goal.title} back="/goals">
    <section className="flex flex-col gap-4 rounded-3xl bg-white p-5">
      <p>{goal.source}{goal.due && ` · ${goal.due}`}</p>
      <p role="status" className="font-semibold text-[var(--ink)]">{goal.done ? '✓ Completed' : 'In progress'}</p>
      {goal.credits && <p>Complete this goal to earn {goal.credits} credits. Credits are awarded once.</p>}
      {opportunity && <ActionLink to={`/earn/${opportunity.id}`}>{opportunity.id === 'parenting-group' ? 'View group details' : 'View learning content'}</ActionLink>}
      {goal.id === 'family-check-in' && <ActionLink to="/forms/monthly-check-in">Open your check-in form</ActionLink>}
      {goal.id === 'log-mood' && <ActionLink to="/">Log your mood on Home</ActionLink>}
      <PrimaryButton disabled={Boolean(goal.credits && goal.done)} onClick={toggle}>{goal.done ? goal.credits ? 'Completed' : 'Reopen goal' : 'Complete goal'}</PrimaryButton>
    </section>
  </Page>
}
