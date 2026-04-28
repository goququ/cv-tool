import { useApplications } from '@/entities/application'
import TrashIcon from '@/shared/assets/icons/trash.svg?react'
import { TextButton } from '@/shared/ui/text-button/text-button'

type DeleteApplicationButtonProps = {
  applicationId: string
}

function DeleteApplicationButton({
  applicationId,
}: DeleteApplicationButtonProps) {
  const { deleteApplication } = useApplications()

  return (
    <TextButton
      aria-label="Delete application"
      leadingIcon={<TrashIcon className="size-5" />}
      onClick={() => {
        void deleteApplication(applicationId)
      }}
    >
      Delete
    </TextButton>
  )
}

export { DeleteApplicationButton }
