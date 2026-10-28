import type { FormAssignment } from '../types/domain'

export default function FormQuestions({
  assignment,
  expanded = false,
}: {
  assignment: FormAssignment
  expanded?: boolean
}) {
  const questions = (
    <ol className="space-y-3">
      {assignment.questions.map((question, index) => (
        <li key={`${question}-${index}`} className="rounded-lg border border-line bg-white p-3">
          <p className="font-semibold">{index + 1}. {question}</p>
          {assignment.responses?.[index] ? (
            <p className="mt-1 text-sm text-accent">
              <span className="font-semibold">
                {assignment.status === 'Completed' ? 'Mother’s answer: ' : 'Pre-populated answer: '}
              </span>
              {assignment.responses[index]}
            </p>
          ) : (
            <p className="mt-1 text-sm text-muted">Awaiting answer</p>
          )}
        </li>
      ))}
    </ol>
  )

  if (assignment.status === 'Completed' || expanded) return questions

  return (
    <details>
      <summary className="cursor-pointer font-semibold text-accent">View assigned questions</summary>
      <div className="mt-3">{questions}</div>
    </details>
  )
}
