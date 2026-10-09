import type { Mother } from '../types/domain'
import { moodOptions } from '../data/moods'
export default function MoodBadge({ mother, showDate = false }: { mother: Mother; showDate?: boolean }) {
  const mood = moodOptions.find(m => m.id === mother.mood)
  if (!mood) return <span className="text-sm text-muted">No mood check-in yet</span>
  return <span className="inline-flex flex-wrap items-center gap-2 text-sm font-medium text-ink">
    <span className="inline-flex items-center gap-2 rounded-full px-3 py-1" style={{ background: mood.color }}><img src={mood.icon} width={26} height={26} alt="" />{mood.label}</span>
    {showDate && <span className="text-xs text-muted">Mother-reported{mother.moodLoggedAt && ` · ${new Date(mother.moodLoggedAt).toLocaleDateString()}`}</span>}
  </span>
}
