import './Earn.css'
import { balance, opportunities, storeItems } from '../data/earn'

// Store and opportunity buttons are inert: the prototype covers the five tab screens only.
export default function Earn() {
  return (
    <main className="screen earn">
      <h1 className="text-heading">Earn</h1>

      <section className="balance-card">
        <p className="balance-amount">{balance.credits} credits</p>
        <p className="balance-week">Earned {balance.earnedThisWeek} this week</p>
      </section>

      <div className="section-head">
        <h2 className="text-subhead">Spend your credits</h2>
        <button className="btn store-link">Visit whole store</button>
      </div>

      <div className="store-scroller">
        {storeItems.map((item) => {
          const affordable = item.cost <= balance.credits
          return (
            <button
              key={item.id}
              className={`card store-item${affordable ? '' : ' is-locked'}`}
              aria-label={`${item.name}, ${item.cost} credits${affordable ? '' : ', not enough credits yet'}`}
            >
              <img className="store-image" src={item.image} alt="" />
              <span className="store-text">
                <span className="store-name">{item.name}</span>
                <span className="store-cost">{item.cost} credits</span>
              </span>
            </button>
          )
        })}
      </div>

      <section className="section">
        <h2 className="text-subhead">Earn more credits</h2>
        <ul className="opportunity-list">
          {opportunities.map((o) => (
            <li key={o.id}>
              <button className="opportunity">
                <span className="opportunity-icon" style={{ background: o.iconBg }}>
                  <img src={o.icon} width={20} height={20} alt="" />
                </span>
                <span className="opportunity-text">
                  <span className="opportunity-title">{o.title}</span>
                  <span className="text-caption opportunity-detail">{o.detail}</span>
                </span>
                <span className="opportunity-credits">+{o.credits}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
