import type { Mother, QuestionDefault } from '../types/domain'
export function resolveDefault(setting: QuestionDefault | undefined, mother: Mother | undefined): string {
  if (!setting?.source) return ''
  if (setting.source === 'custom') return setting.value
  if (!mother) return ''
  return setting.source === 'needs' ? mother.needs.join(', ') : mother[setting.source]
}
