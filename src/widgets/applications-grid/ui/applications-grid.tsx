import { ApplicationPreviewCard, useApplications } from '@/entities/application'
import { CopyApplicationButton } from '@/features/copy-application'
import { DeleteApplicationButton } from '@/features/delete-application'

function ApplicationsGrid() {
  const { applications } = useApplications()

  if (applications.length === 0) {
    return null
  }

  const sortedApplications = [...applications].sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt),
  )

  return (
    <ul className="grid list-none gap-6 p-0 lg:grid-cols-2">
      {sortedApplications.map((application) => (
        <li key={application.id}>
          <ApplicationPreviewCard
            actions={
              <>
                <DeleteApplicationButton applicationId={application.id} />
                <CopyApplicationButton letter={application.letter} />
              </>
            }
            letter={application.letter}
          />
        </li>
      ))}
    </ul>
  )
}

export { ApplicationsGrid }
