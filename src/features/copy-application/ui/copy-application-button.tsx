import { useCallback, useEffect, useRef, useState } from 'react'

import CopyIcon from '@/shared/assets/icons/copy.svg?react'
import { TextButton } from '@/shared/ui/text-button/text-button'

const COPIED_RESET_DELAY_MS = 1500

type CopyApplicationButtonProps = {
  letter: string
}

function CopyApplicationButton({ letter }: CopyApplicationButtonProps) {
  const [isCopied, setIsCopied] = useState(false)
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        clearTimeout(resetTimerRef.current)
      }
    }
  }, [])

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText(letter).then(() => {
      setIsCopied(true)

      if (resetTimerRef.current !== null) {
        clearTimeout(resetTimerRef.current)
      }

      resetTimerRef.current = setTimeout(() => {
        setIsCopied(false)
      }, COPIED_RESET_DELAY_MS)
    })
  }, [letter])

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

export { COPIED_RESET_DELAY_MS, CopyApplicationButton }
