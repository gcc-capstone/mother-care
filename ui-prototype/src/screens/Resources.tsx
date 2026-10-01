import { useState } from 'react'
import './Resources.css'

import pinIcon from '../assets/icons/location-pin.svg'
import chevronIcon from '../assets/icons/chevron-down-small.svg'
import searchIcon from '../assets/icons/search.svg'
import filterIcon from '../assets/icons/filter.svg'
import thumbsUpIcon from '../assets/icons/thumbs-up.svg'
import { categories, location, resources, type Category } from '../data/resources'

// Location, filter and "View" buttons are inert: the prototype covers the five tab screens only.
export default function Resources() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category>('All')

  const q = query.trim().toLowerCase()
  const visible = resources.filter(
    (r) =>
      (category === 'All' || r.categories.includes(category)) &&
      (q === '' || `${r.name} ${r.org} ${r.provides}`.toLowerCase().includes(q)),
  )

  return (
    <main className="screen resources">
      <h1 className="text-heading">Resources</h1>

      <button className="location-chip">
        <img src={pinIcon} width={15} height={15} alt="" />
        <span>{location}</span>
        <img src={chevronIcon} width={14} height={14} alt="" />
      </button>

      <div className="search-row">
        <label className="search-box">
          <img src={searchIcon} width={18} height={18} alt="" />
          <input
            type="search"
            placeholder="Search resources"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <button className="filter-button" aria-label="Filters">
          <img src={filterIcon} width={20} height={20} alt="" />
        </button>
      </div>

      <div className="category-chips">
        {categories.map((c) => (
          <button
            key={c}
            className="category-chip"
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <section className="section">
        <h2 className="text-subhead">Recommended for you</h2>
        {visible.length === 0 ? (
          <p className="text-caption resource-empty">No resources match. Try another search or category.</p>
        ) : (
          visible.map((r) => (
            <article key={r.id} className="resource-card">
              <div className="resource-header">
                {r.logo ? (
                  <div className="resource-logo">
                    <img src={r.logo} alt="" />
                  </div>
                ) : (
                  <div className="resource-logo resource-logo-initials">{r.initials}</div>
                )}
                <div className="resource-names">
                  <h3 className="resource-name">{r.name}</h3>
                  <p className="text-caption">{r.org}</p>
                </div>
              </div>

              <div className="resource-meta">
                <p className="resource-status">
                  <span className={r.isOpen ? 'is-open' : 'is-varies'}>{r.status}</span>
                  <span>·</span>
                  <span>{r.distance}</span>
                </p>
                <span className={`resource-rating${r.rating === 'Very good' ? ' is-top' : ''}`}>
                  <img src={thumbsUpIcon} width={12} height={12} alt="" />
                  {r.rating}
                </span>
              </div>

              <div className="resource-details">
                <p className="resource-provides">{r.provides}</p>
                <p className="text-caption">{r.address}</p>
              </div>

              <button className="btn btn-primary resource-view">View</button>
            </article>
          ))
        )}
      </section>
    </main>
  )
}
