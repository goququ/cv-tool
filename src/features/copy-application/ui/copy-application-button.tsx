import { useCallback } from 'react'

import CopyIcon from '@/shared/assets/icons/copy.svg?react'
import { useCopyToClipboard } from '@/shared/lib/use-copy-to-clipboard'
import { TextButton } from '@/shared/ui/text-button/text-button'

type CopyApplicationButtonProps = {
  letter: string
}

function CopyApplicationButton({ letter }: CopyApplicationButtonProps) {
  const { copy, isCopied } = useCopyToClipboard()

  const handleCopy = useCallback(() => {
    void copy(letter)
  }, [copy, letter])

  return (
    <TextButton
      aria-label="Copy letter to clipboard"
      onClick={handleCopy}
      trailingIcon={<CopyIcon className="size-5" />}
    >
      {isCopied ? 'Copied!' : 'Copy to clipboard'}
    </TextButton>
  )
}

export { CopyApplicationButton }
