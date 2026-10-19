export function seconds(ms: number | null) { return ms === null ? '—' : `${(ms / 1000).toFixed(1)} s` }
