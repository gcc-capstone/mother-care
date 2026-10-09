import { Page } from '../components/Page'
import { Link } from 'react-router-dom'
import { useMotherState } from '../hooks/useMotherState'
import { useEffect, useState } from 'react'

import pinIcon from '../assets/icons/location-pin.svg'
import chevronIcon from '../assets/icons/chevron-down-small.svg'
import searchIcon from '../assets/icons/search.svg'
import filterIcon from '../assets/icons/filter.svg'
import { categories, resources, type Category } from '../data/resources'

export default function Resources() {
  const [query, setQuery] = useState('')
  const { profile, setProfile, counselorName, recommendations, recentlyViewed, recentSearches, recordSearch } = useMotherState()
  const [editingLocation, setEditingLocation] = useState(false)
  const [locationDraft, setLocationDraft] = useState(profile.location)
  const [showFilters, setShowFilters] = useState(false)
  const [openOnly, setOpenOnly] = useState(false)
  const [category, setCategory] = useState<Category>('All')

  useEffect(() => {
    if (!query.trim()) return
    const timer = window.setTimeout(() => recordSearch(query), 800)
    return () => window.clearTimeout(timer)
  }, [query, recordSearch])

  const q = query.trim().toLowerCase()
  const visible = resources.filter(
    (r) =>
      (!openOnly || r.isOpen) &&
      (category === 'All' || r.categories.includes(category)) &&
      (q === '' || `${r.name} ${r.org} ${r.provides}`.toLowerCase().includes(q)),
  )

  return (
    <Page title="Resources">

      <button onClick={() => { setLocationDraft(profile.location); setEditingLocation(v => !v) }} aria-expanded={editingLocation} className="flex min-h-11 max-w-full self-start items-center gap-1.5 rounded-full border border-[var(--border)] bg-white px-3 py-[7px] text-left text-[13px] font-semibold text-[var(--ink)]">
        <img className="shrink-0" src={pinIcon} width={15} height={15} alt="" />
        <span className="min-w-0">{profile.location}</span>
        <img className="shrink-0" src={chevronIcon} width={14} height={14} alt="" />
      </button>

      {editingLocation && <form className="flex flex-col gap-3 rounded-2xl bg-white p-4" onSubmit={e => { e.preventDefault(); if (!locationDraft.trim()) return; setProfile(prev => ({ ...prev, location: locationDraft.trim() })); setEditingLocation(false) }}>
        <label className="flex flex-col gap-2">Your location<input required maxLength={100} className="rounded-xl border border-[var(--border)] p-3" value={locationDraft} onChange={e => setLocationDraft(e.target.value)} /></label>
        <p className="text-xs text-[var(--muted)]">These sample resources are in the Allegheny Valley area.</p>
        <button className="min-h-11 rounded-full bg-[var(--ink)] p-3 text-white">Save location</button><button type="button" className="min-h-11" onClick={() => setEditingLocation(false)}>Cancel</button>
      </form>}
      <form onSubmit={e => { e.preventDefault(); recordSearch(query) }} className="flex items-center gap-2.5">
        <label className="flex min-w-0 flex-1 cursor-text items-center gap-2.5 rounded-full border border-[var(--border)] bg-white px-3.5 py-3 focus-within:border-[var(--ink)] [&>input]:min-w-0 [&>input]:flex-1 [&>input]:bg-transparent [&>input]:text-[15px]">
          <img src={searchIcon} width={18} height={18} alt="" />
          <input
            type="search"
            aria-label="Search resources"
            placeholder="Search resources"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <button className="flex size-[46px] shrink-0 items-center justify-center rounded-full bg-[var(--ink)]" type="button" aria-label="Filters" aria-expanded={showFilters} onClick={() => setShowFilters(v => !v)}>
          <img src={filterIcon} width={20} height={20} alt="" />
        </button>
      </form>
      <button className="min-h-11 self-start font-semibold text-[var(--ink)]" onClick={() => recordSearch(query)} disabled={!query.trim()}>Search</button>

      {showFilters && <section className="flex flex-col gap-2 rounded-2xl bg-white p-4" aria-label="Resource filters"><label className="flex min-h-11 items-center gap-3"><input type="checkbox" checked={openOnly} onChange={e => setOpenOnly(e.target.checked)} className="size-5 accent-[var(--ink)]" />Open now only</label><button className="min-h-11 self-start font-semibold" onClick={() => { setQuery(''); setCategory('All'); setOpenOnly(false) }}>Reset filters</button></section>}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c}
            className="min-h-11 shrink-0 rounded-full border border-[var(--border)] bg-white px-3.5 py-2 text-[13px] font-semibold aria-pressed:border-[var(--ink)] aria-pressed:bg-[var(--ink)] aria-pressed:text-white"
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <section className="flex flex-col gap-3 rounded-3xl bg-[var(--sage-strip)] p-5" aria-labelledby="counselor-resources">
        <h2 id="counselor-resources" className="text-lg font-semibold text-[var(--ink)]">From your counselor</h2>
        <p className="text-sm">Recommendations from {counselorName}</p>
        {recommendations.map(rec => { const resource = resources.find(r => r.id === rec.resourceId); return resource ? <article key={resource.id} className="flex flex-col gap-2 rounded-2xl bg-white p-4"><h3 className="font-semibold text-[var(--ink)]">{resource.name}</h3><p className="text-sm">{rec.note}</p><Link className="flex min-h-11 items-center font-semibold text-[var(--ink)]" to={`/resources/${resource.id}`}>Explore resource →</Link></article> : null })}
      </section>
      <section className="flex flex-col gap-3" aria-labelledby="recent-activity"><h2 id="recent-activity" className="text-lg font-semibold">Recently viewed & searched</h2>
        {recentlyViewed.length ? <div className="flex flex-col gap-2">{recentlyViewed.map(id => { const resource = resources.find(r => r.id === id); return resource ? <Link key={id} className="flex min-h-11 items-center rounded-2xl bg-white p-3 font-semibold text-[var(--ink)]" to={`/resources/${id}`}>{resource.name} →</Link> : null })}</div> : <p className="text-sm text-[var(--muted)]">Resources you open will appear here.</p>}
        {recentSearches.length ? <div className="flex flex-wrap gap-2">{recentSearches.map(term => <button key={term} className="min-h-11 rounded-full border border-[var(--border)] bg-white px-4 text-sm" onClick={() => { setQuery(term); setCategory('All'); setOpenOnly(false); recordSearch(term) }}>Search: {term}</button>)}</div> : <p className="text-sm text-[var(--muted)]">Your recent searches will appear here.</p>}
      </section>
      <section className="flex flex-col gap-2.5">
        <h2 className="text-lg font-semibold leading-snug">{q || category !== 'All' || openOnly ? `Search results (${visible.length})` : 'Browse resources'}</h2>
        {visible.length === 0 ? (
          <p className="text-[13px] leading-snug text-[var(--muted)] py-6 text-center">No resources match. Try another search or category.</p>
        ) : (
          visible.map((r) => (
            <article key={r.id} className="flex flex-col gap-3 rounded-[20px] bg-white p-4">
              <div className="flex items-center gap-3">
                {r.logo ? (
                  <div className="flex size-[58px] shrink-0 items-center justify-center rounded-[14px] border border-[var(--border)] bg-white p-1 [&>img]:size-[50px] [&>img]:object-contain">
                    <img src={r.logo} alt="" />
                  </div>
                ) : (
                  <div className="flex size-[58px] shrink-0 items-center justify-center rounded-[14px] bg-[var(--sage-strip)] p-1 text-xl font-semibold text-[var(--ink)]">{r.initials}</div>
                )}
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <h3 className="text-[17px] font-semibold text-[var(--ink)]">{r.name}</h3>
                  <p className="text-[13px] leading-snug text-[var(--muted)]">{r.org}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <p className="flex min-w-0 flex-1 flex-wrap gap-2 text-[13px] text-[var(--muted)]">
                  <span className={r.isOpen ? 'font-semibold text-[var(--sage)]' : 'font-semibold'}>{r.status}</span>
                  <span>·</span>
                  <span>{r.distance}</span>
                </p>

              </div>

              <div className="flex flex-col gap-1">
                <p className="whitespace-pre-wrap text-[13px]">{r.provides}</p>
                <p className="text-[13px] leading-snug text-[var(--muted)]">{r.address}</p>
              </div>

              <Link to={`/resources/${r.id}`} className="inline-flex min-h-11 items-center justify-center rounded-full font-semibold leading-snug disabled:cursor-not-allowed disabled:opacity-40 w-full bg-[var(--ink)] p-3 text-[15px] text-white">View</Link>
            </article>
          ))
        )}
      </section>
    </Page>
  )
}
