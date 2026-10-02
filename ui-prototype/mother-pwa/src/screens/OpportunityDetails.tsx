import { useParams } from 'react-router-dom'
import { opportunities } from '../data/earn'
import { useMotherState } from '../hooks/useMotherState'
import { ActionLink, MissingRecord, Page, PrimaryButton } from '../components/Page'

export default function OpportunityDetails() {
  const { id } = useParams()
  const opportunity = opportunities.find(o => o.id === id)
  const { completedOpportunities, reservations, goals, completeOpportunity, reserve, counselorName } = useMotherState()
  if (!opportunity) return <MissingRecord back="/earn" />
  const group = opportunity.id === 'parenting-group'
  const done = group ? reservations.includes(opportunity.id) : completedOpportunities.includes(opportunity.id) || goals.some(g => g.id === opportunity.id && g.done)
  return <Page title={opportunity.title} back="/earn">
    <p className="text-sm text-[var(--muted)]">{opportunity.detail} · +{opportunity.credits} credits</p>
    <article className="flex flex-col gap-4 rounded-3xl bg-white p-5"><h2 className="text-lg font-semibold">{group ? 'Your next group' : 'Learning guide'}</h2><p className="leading-relaxed">{opportunity.content.replaceAll('Carol', counselorName)}</p>
      {done && <p role="status" className="font-semibold text-[var(--ink)]">{group ? '✓ Your place is reserved for October 6.' : `✓ Completed. Your ${opportunity.credits} credits are included in your balance.`}</p>}
      <PrimaryButton disabled={done} onClick={() => group ? reserve(opportunity.id) : completeOpportunity(opportunity.id)}>{done ? group ? 'Reserved' : 'Completed' : opportunity.action}</PrimaryButton>
      <ActionLink to="/goals">View your goals</ActionLink>
    </article>
  </Page>
}
