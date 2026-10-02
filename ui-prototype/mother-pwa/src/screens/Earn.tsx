import { Page } from '../components/Page'
import { Link } from 'react-router-dom'
import { useMotherState } from '../hooks/useMotherState'
import { opportunities, storeItems } from '../data/earn'

export default function Earn() {
  const { credits, earned, redemptions, completedOpportunities, reservations } = useMotherState()
  return (
    <Page title="Earn">

      <section className="flex flex-col items-center gap-0.5 rounded-[20px] bg-[var(--ink)] p-[18px]">
        <p className="text-[32px] font-semibold leading-tight text-white">{credits} credits</p>
        <p className="text-[13px] text-[#b9c7b2]">Earned {earned} this week</p>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold leading-snug">Spend your credits</h2>
        <Link to="/store" className="inline-flex min-h-11 items-center justify-center rounded-full font-semibold leading-snug disabled:cursor-not-allowed disabled:opacity-40 border border-[var(--ink)] px-3.5 py-[7px] text-[13px] text-[var(--ink)]">Visit whole store</Link>
      </div>

      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1">
        {storeItems.map((item) => {
          const affordable = item.cost <= credits
          return (
            <Link to={`/store/${item.id}`}
              key={item.id}
              className={`overflow-hidden bg-white group flex w-[148px] shrink-0 snap-start flex-col rounded-[18px] text-left${affordable ? '' : ' opacity-60'}`}
              aria-label={`${item.name}, ${item.cost} credits${affordable ? '' : ', not enough credits yet'}`}
            >
              <img className="h-[118px] w-full object-cover" src={item.image} alt="" />
              <span className="flex flex-col items-start gap-1.5 px-3 pb-3 pt-2.5">
                <span className="text-sm font-semibold text-[var(--ink)]">{item.name}</span>
                <span className="rounded-full bg-[var(--sage-strip)] px-2.5 py-1 text-xs font-semibold text-[var(--ink)]">{redemptions.includes(item.id) ? '✓ Redeemed' : `${item.cost} credits`}</span>
              </span>
            </Link>
          )
        })}
      </div>

      <section className="flex flex-col gap-2.5">
        <h2 className="text-lg font-semibold leading-snug">Earn more credits</h2>
        <ul className="m-0 list-none overflow-hidden rounded-[20px] bg-white p-0 [&>li+li]:border-t [&>li+li]:border-[var(--border)]">
          {opportunities.map((o) => (
            <li key={o.id}>
              <Link to={`/earn/${o.id}`} className="flex w-full items-center gap-3 px-4 py-3.5 text-left">
                <span className={`flex size-[42px] shrink-0 items-center justify-center rounded-xl ${o.iconBg}`}>
                  <img src={o.icon} width={20} height={20} alt="" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-[15px] font-semibold text-[var(--ink)]">{o.title}</span>
                  <span className="text-[13px] leading-snug text-[var(--muted)] whitespace-pre-wrap">{o.detail}</span>
                </span>
                <span className="shrink-0 rounded-full bg-[var(--sage-strip)] px-[11px] py-[5px] text-[13px] font-semibold text-[var(--sage)]">{completedOpportunities.includes(o.id) ? '✓ Done' : reservations.includes(o.id) ? 'Reserved' : `+${o.credits}`}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  )
}
