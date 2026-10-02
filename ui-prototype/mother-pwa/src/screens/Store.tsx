import { Link, useParams } from 'react-router-dom'
import { storeItems } from '../data/earn'
import { useMotherState } from '../hooks/useMotherState'
import { ActionLink, MissingRecord, Page, PrimaryButton } from '../components/Page'

export default function Store() {
  const { id } = useParams()
  const { credits, redemptions, redeem, counselorName } = useMotherState()
  const item = storeItems.find(r => r.id === id)
  if (id && !item) return <MissingRecord back="/store" />
  if (item) {
    const redeemed = redemptions.includes(item.id)
    return <Page title={item.name} back="/store"><img className="h-48 w-full rounded-3xl object-cover" src={item.image} alt={item.name} />
      <p className="text-lg font-semibold">{item.cost} credits</p><p>Your balance: {credits} credits</p>
      {redeemed ? <p role="status" className="rounded-2xl bg-[var(--sage-strip)] p-4">✓ Redeemed. Your item is reserved for pickup at your next visit with {counselorName}.</p> : <><p>Redeem your credits to reserve this item for pickup with {counselorName}. One of each item is available per visit.</p><PrimaryButton disabled={credits < item.cost} onClick={() => { redeem(item.id) }}>Redeem for {item.cost} credits</PrimaryButton>{credits < item.cost && <p>You need {item.cost - credits} more credits.</p>}</>}
      <ActionLink to="/earn">Earn more credits</ActionLink>
    </Page>
  }
  return <Page title="Credit store" back="/earn"><p>Your balance: <strong>{credits} credits</strong></p><div className="grid grid-cols-2 gap-3">{storeItems.map(item => <Link key={item.id} to={`/store/${item.id}`} className="overflow-hidden rounded-2xl bg-white"><img className="h-28 w-full object-cover" src={item.image} alt="" /><div className="flex flex-col gap-2 p-3"><h2 className="text-sm font-semibold">{item.name}</h2><p className="text-sm">{redemptions.includes(item.id) ? '✓ Redeemed' : `${item.cost} credits`}</p></div></Link>)}</div></Page>
}
