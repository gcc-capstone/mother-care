import assetb356d from "../assets/b356d.svg"
import assetaf6c9 from "../assets/af6c9.svg"
import assetce264 from "../assets/ce264.svg"
import asset8878d from "../assets/8878d.svg"
import asset46af3 from "../assets/46af3.svg"
import asset4e6f4 from "../assets/4e6f4.svg"
import asset8d6a0 from "../assets/8d6a0.svg"
import { useRef } from "react"
import "./AdminGoals.css";

const metrics = [
  ["DAYS ACTIVE", "148", "Since May 6, 2026"],
  ["GOALS MET", "12", "80% completion rate"],
  ["TASKS PENDING", "4", "1 due today"],
  ["NEXT MILESTONE", "Oct 08", "Housing plan review"],
]

function FilterButton({ children }: { children: string }) {
  return (
    <button className="filter" type="button">
      {children}
      <img src={assetb356d} alt="" />
    </button>
  )
}

export default function App() {
  const titleRef = useRef<HTMLInputElement>(null)

  const beginGoal = () => {
    titleRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    titleRef.current?.focus({ preventScroll: true })
  }

  return (
    <main className="workspace">
      <header className="topbar">
        <div className="secure-status">
          <img src={assetaf6c9} alt="" />
          <span>Secure Mother Care workspace</span>
        </div>
        <div className="account">
          <div className="avatar">AR</div>
          <div>
            <strong>Alex Rivera</strong>
            <span>Counselor</span>
          </div>
        </div>
      </header>

      <div className="page-content">
        <section className="page-heading">
          <div>
            <p className="eyebrow">CARE CONTINUITY</p>
            <h1>Goals for Jan Williams</h1>
          </div>
          <button className="primary-button" type="button" onClick={beginGoal}>
            Create goal
            <img src={assetce264} alt="" />
          </button>
        </section>

        <aside className="security-banner">
          <img src={asset8878d} alt="" />
          <p>
            Goals are written in supportive, mother-facing language. Reminders
            respect Jan’s contact preferences and quiet hours.
          </p>
        </aside>

        <section className="metrics" aria-label="Case summary">
          {metrics.map(([label, value, detail]) => (
            <article className="metric-card" key={label}>
              <strong>{label}</strong>
              <b>{value}</b>
              <span>{detail}</span>
            </article>
          ))}
        </section>

        <div className="dashboard-grid">
          <section className="panel tracker-panel">
            <div className="panel-body">
              <div className="section-heading">
                <h2>Active goals tracker</h2>
                <p>4 active · 12 completed · 80% overall completion</p>
              </div>

              <div className="toolbar">
                <label className="search">
                  <img src={asset46af3} alt="" />
                  <input
                    aria-label="Search goals"
                    placeholder="Search Jan’s goals…"
                  />
                </label>
                <FilterButton>Active</FilterButton>
                <FilterButton>Due soon</FilterButton>
                <FilterButton>Completed</FilterButton>
              </div>

              <article className="goal-card goal-card--green">
                <div className="goal-heading">
                  <h3>Take Daily Prenatal Vitamin</h3>
                  <span className="pill pill--green">ON TRACK</span>
                </div>
                <p>Daily at 8:00 AM · Mother-owned · Next reminder tomorrow</p>
                <div className="progress">
                  <div className="progress-track" />
                  <strong>12-day streak</strong>
                </div>
                <div className="info-row">
                  <span>Review cadence</span>
                  <strong>Weekly with counselor</strong>
                </div>
              </article>

              <article className="goal-card goal-card--cream">
                <div className="goal-heading">
                  <h3>Pick Up Interview Clothes</h3>
                  <span className="pill pill--amber">DUE WEDNESDAY</span>
                </div>
                <p>
                  Wednesday at 3:00 PM · Linked to The Sparrows Nest ·
                  Counselor-supported
                </p>
                <div className="milestones">
                  <span>✓ Referral sent</span>
                  <span>✓ Visit planned</span>
                  <span>Pickup</span>
                </div>
              </article>

              <div className="completed-table">
                <div className="table-head">
                  COMPLETED GOAL <i>·</i> COMPLETED <i>·</i> OWNER <i>·</i>{" "}
                  OUTCOME
                </div>
                <div className="table-row">
                  <span>Attend prenatal appointment</span>
                  <span>Sep 26</span>
                  <span>Jan</span>
                  <span>COMPLETED</span>
                </div>
                <div className="table-row">
                  <span>Submit housing waitlist form</span>
                  <span>Sep 20</span>
                  <span>Jan + Alex</span>
                  <span>COMPLETED</span>
                </div>
              </div>

              <div className="pagination">
                <span>2 active · 12 completed goals</span>
                <button type="button">
                  ‹ Previous&nbsp;&nbsp; 1&nbsp; 2&nbsp; 3&nbsp;&nbsp; Next ›
                </button>
              </div>
            </div>
          </section>

          <aside className="panel creation-panel">
            <div className="goal-context">
              <div className="identity">
                <div className="section-heading">
                  <h2>Create a goal</h2>
                  <p>Jan Williams · active case</p>
                </div>
                <span className="pill pill--blue">MOTHER-VISIBLE</span>
              </div>
              <p>
                Jan’s latest check-in requested practical support for interview
                preparation and prenatal routines.
              </p>
            </div>

            <form
              className="goal-form"
              onSubmit={(event) => event.preventDefault()}
            >
              <label className="field">
                <strong>Goal title</strong>
                <input
                  ref={titleRef}
                  defaultValue="Prepare two interview-ready outfits"
                />
              </label>
              <label className="field">
                <strong>Description</strong>
                <textarea defaultValue="Choose two comfortable outfits and set them aside before the first interview." />
              </label>
              <div className="field-row">
                <label className="field">
                  <strong>Category</strong>
                  <input defaultValue="Employment readiness" />
                </label>
                <label className="field">
                  <strong>Target completion</strong>
                  <input defaultValue="Oct 7 · 3:00 PM" />
                </label>
              </div>
              <div className="field-row">
                <label className="field">
                  <strong>Recurrence</strong>
                  <input defaultValue="One time" />
                </label>
                <label className="field">
                  <strong>Reminder</strong>
                  <input defaultValue="1 day + 2 hours before" />
                </label>
              </div>
              <label className="field">
                <strong>Counselor notes</strong>
                <textarea defaultValue="Offer help coordinating transportation if needed." />
              </label>
              <div className="settings">
                <label className="choice">
                  <input type="checkbox" defaultChecked />
                  <img src={asset4e6f4} alt="" />
                  <span>
                    <strong>Visible to Jan</strong>
                    <small>Client app</small>
                  </span>
                </label>
                <label className="choice">
                  <input type="checkbox" defaultChecked />
                  <img src={asset4e6f4} alt="" />
                  <span>
                    <strong>Weekly review</strong>
                    <small>Care cadence</small>
                  </span>
                </label>
              </div>
            </form>

            <div className="dispatch">
              <div className="sync-status">
                <img src={asset8d6a0} alt="" />
                <strong>⚡ Jan’s app connection is active</strong>
              </div>
              <button type="button">
                <span>Assign &amp; Push Goal to Mother Client</span>
                <span>↗</span>
              </button>
              <p>⚡ Syncs automatically to Mother Client App</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
