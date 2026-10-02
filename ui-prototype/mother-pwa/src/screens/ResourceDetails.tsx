import { useMotherState } from '../hooks/useMotherState'
import { useParams } from 'react-router-dom'
import { resources } from '../data/resources'
import { ActionLink, MissingRecord, Page } from '../components/Page'

export default function ResourceDetails() {
  const { counselorName } = useMotherState()
  const { id } = useParams()
  const resource = resources.find(r => r.id === id)
  if (!resource) return <MissingRecord back="/resources" />
  return <Page title={resource.name} back="/resources">
    <section className="flex flex-col gap-4 rounded-3xl bg-white p-5">
      <p className="font-semibold">{resource.org}</p><p>{resource.provides}</p>
      <p className="text-sm">{resource.status} · {resource.distance}</p>
      <h2 className="text-lg font-semibold">Location</h2><p>{resource.address}</p>
      <h2 className="text-lg font-semibold">Before you visit</h2><p>Bring a photo ID if available and a list of the items or support your family needs. Availability can vary. {counselorName} can help you plan your visit and find alternatives.</p>
      <ActionLink to="/forms/monthly-check-in">Ask for help in your check-in</ActionLink>
    </section>
  </Page>
}
