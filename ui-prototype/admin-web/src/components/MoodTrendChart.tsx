import { useState } from 'react'
import type { MoodCheckIn } from '../types/domain'
import { Empty } from './ui'

const moodLevels = [
  { mood: 'great', label: 'Great', score: 5 },
  { mood: 'good', label: 'Good', score: 4 },
  { mood: 'okay', label: 'Okay', score: 3 },
  { mood: 'low', label: 'Low', score: 2 },
  { mood: 'rough', label: 'Rough', score: 1 },
] as const

function dateLabel(day: string) {
  return new Date(`${day}T12:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export default function MoodTrendChart({ checkIns }: { checkIns: MoodCheckIn[] }) {
  const [rangeDays, setRangeDays] = useState<7 | 14 | 30>(7)
  if (!checkIns.length) return <Empty>No mood check-ins recorded yet.</Empty>

  // Use the last reported mood on each day so several check-ins on one day
  // occupy one clear point in the weekly trend.
  const latestByDay = new Map<string, MoodCheckIn>()
  for (const checkIn of [...checkIns].sort((a, b) => a.loggedAt.localeCompare(b.loggedAt))) {
    latestByDay.set(checkIn.loggedAt.slice(0, 10), checkIn)
  }
  const latestDay = [...latestByDay.keys()].sort().at(-1)!
  const windowDays = Array.from({ length: rangeDays + 1 }, (_, index) => {
    const date = new Date(`${latestDay}T12:00:00Z`)
    date.setUTCDate(date.getUTCDate() - rangeDays + index)
    return date.toISOString().slice(0, 10)
  })
  const points = windowDays.flatMap((day, index) => {
    const checkIn = latestByDay.get(day)
    if (!checkIn) return []
    const level = moodLevels.find((item) => item.mood === checkIn.mood)!
    return [{
      day,
      checkIn,
      label: level.label,
      x: ((index + 0.5) / windowDays.length) * 100,
      y: 94 - ((level.score - 1) / 4) * 88,
    }]
  })
  const line = points.map((point, index) => `${index ? 'L' : 'M'} ${point.x} ${point.y}`).join(' ')
  const area = points.length > 1
    ? `${line} L ${points.at(-1)!.x} 100 L ${points[0].x} 100 Z`
    : ''
  const tickCount = rangeDays === 7 ? 3 : 5
  const tickDays = Array.from({ length: tickCount }, (_, index) =>
    windowDays[Math.round((index / (tickCount - 1)) * (windowDays.length - 1))],
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">{dateLabel(windowDays[0])} to {dateLabel(latestDay)}</p>
        <div role="group" aria-label="Mood chart time range" className="inline-flex flex-wrap gap-1 rounded-lg bg-canvas p-1">
          {([
            { label: '1 week', days: 7 },
            { label: '2 weeks', days: 14 },
            { label: '1 month', days: 30 },
          ] as const).map((range) => (
            <button
              key={range.days}
              type="button"
              aria-pressed={rangeDays === range.days}
              className="rounded-md px-3 py-1.5 text-xs font-semibold text-accent hover:bg-sage aria-pressed:bg-brand aria-pressed:text-white"
              onClick={() => setRangeDays(range.days)}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-[3.75rem_minmax(0,1fr)] gap-x-2">
        <div className="flex h-52 flex-col justify-between py-2 text-xs font-medium text-muted" aria-hidden="true">
          {moodLevels.map((level) => <span key={level.mood}>{level.label}</span>)}
        </div>
        <div
          className="relative h-52 min-w-0"
          role="img"
          aria-label={`Mood trend from ${dateLabel(windowDays[0])} to ${dateLabel(latestDay)}. ${points.map((point) => `${dateLabel(point.day)}: ${point.label}`).join('; ')}`}
        >
          {moodLevels.map((level) => (
            <div
              key={level.mood}
              className="absolute inset-x-0 border-t border-line"
              style={{ top: `${94 - ((level.score - 1) / 4) * 88}%` }}
              aria-hidden="true"
            />
          ))}
          {points.length > 1 && (
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path d={area} fill="#edf6f2" opacity="0.8" />
              <path
                d={line}
                fill="none"
                stroke="#2e7166"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          )}
          {points.map((point, index) => (
            <span
              key={point.day}
              className={`absolute z-10 block -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm ${index === points.length - 1 ? 'size-4 bg-brand' : rangeDays === 30 ? 'size-2.5 bg-accent' : 'size-3 bg-accent'}`}
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              title={`${dateLabel(point.day)}: ${point.label}`}
              aria-hidden="true"
            />
          ))}
        </div>
        <div />
        <div className="flex justify-between gap-1 text-[10px] text-muted sm:text-xs" aria-hidden="true">
          {tickDays.map((day, index) => (
            <span key={day} className={index === 0 || index === tickDays.length - 1 ? 'font-semibold text-ink' : ''}>
              {dateLabel(day)}
            </span>
          ))}
        </div>
      </div>
      <p className="text-xs text-muted">
        {points.length} day{points.length === 1 ? '' : 's'} with a check-in. Dots mark reported moods; lines connect recorded days.
      </p>
    </div>
  )
}
