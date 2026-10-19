import type { ApplicationId } from './types.ts'

const staticRoutes: Record<ApplicationId, readonly string[]> = {
  'mother-pwa': ['/', '/forms', '/resources', '/earn', '/store', '/goals', '/profile', '/notifications'],
  'admin-web': ['/', '/admin', '/admin/admingoals', '/admin/counselors', '/admin/dashboard', '/admin/appointments', '/admin/forms', '/admin/meetings', '/admin/form-builder', '/admin/resource-catalog', '/admin/groups', '/admin/performance', '/admin/reccomendresources', '/admin/motherselection', '/admin/followup'],
}
export function safeRoute(application: ApplicationId, value: string): string {
  const path = value.split(/[?#]/, 1)[0].replace(/\/$/, '') || '/'
  if (staticRoutes[application].includes(path)) return path
  const prefixes = application === 'mother-pwa' ? ['/forms/', '/resources/', '/earn/', '/store/', '/goals/'] : ['/admin/mothers/', '/admin/form-builder/']
  for (const prefix of prefixes) {
    if (path.startsWith(prefix) && path.slice(prefix.length) && !path.slice(prefix.length).includes('/')) {
      return `${prefix}${prefix === '/admin/mothers/' ? ':motherId' : ':id'}`
    }
  }
  return '/:unrecognized'
}
// Exact allowlist: never treat arbitrary DOM IDs, names, labels or text as telemetry.
export const semanticIds = [
  'nav-home', 'nav-resources', 'nav-forms', 'nav-goals', 'nav-earn',
  'resource-category', 'resource-category-diapers', 'resource-search', 'resource-filters', 'assigned-resource', 'resource-view',
  'profile-save', 'form-submit', 'activity-complete', 'goal-complete',
  'mother-search', 'mother-filter', 'mother-open', 'mother-picker', 'goal-new', 'goal-save',
  'resource-recommend', 'recommendation-save', 'form-assign', 'form-edit', 'resource-edit', 'resource-save',
  'followup-update', 'demo-role',
] as const
export function safeElementId(value: string | null): string | undefined {
  return semanticIds.find(id => id === value)
}
export function testerLabel(value: string): string {
  if (!value.trim()) return ''
  if (!/^Tester \d{1,3}$/.test(value.trim())) throw new Error('Use an anonymous label such as Tester 01 (no names).')
  return value.trim()
}
export function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
}
