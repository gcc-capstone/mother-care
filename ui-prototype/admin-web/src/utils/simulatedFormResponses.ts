import type { FormAssignment, Mother } from '../types/domain'

const moodScores = { rough: '1', low: '2', okay: '3', good: '4', great: '5' }

export function simulatedFormResponses(
  assignment: FormAssignment,
  mother?: Mother,
): string[] {
  return assignment.questions.map((question, index) => {
    const existing = assignment.responses?.[index]?.trim()
    if (existing) return existing

    const prompt = question.toLowerCase()
    if (prompt.includes('feeling today'))
      return mother?.mood ? moodScores[mother.mood] : '3'
    if (prompt.includes('feel safe')) return 'Yes, I feel safe today.'
    if (prompt.includes('support would be useful') || prompt.includes('practical support'))
      return mother?.needs[0]
        ? `Help with ${mother.needs[0].toLowerCase()} would be useful.`
        : 'I would like to review available support with my counselor.'
    if (prompt.includes('immediate needs'))
      return mother?.needs.join(', ') || 'I would like to discuss my needs with my counselor.'
    if (prompt.includes('preferred contact'))
      return mother?.contact || 'Mother Client App'
    if (prompt.includes('goal did you make progress'))
      return 'I made progress on the care plan we discussed at my last visit.'
    if (prompt.includes('counselor follow-up')) return 'Yes, please contact me.'
    if (prompt.includes('routine is going well'))
      return 'Our evening routine has been more consistent this week.'
    if (prompt.includes('next appointment'))
      return 'I would like to talk about the support I need this month.'
    if (prompt.includes('support group'))
      return 'Yes, please send me the group details.'
    return 'I would like to discuss this with my counselor.'
  })
}
