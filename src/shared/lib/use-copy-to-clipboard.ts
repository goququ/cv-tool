import { useCallback, useEffect, useRef, useState } from 'react'

const DEFAULT_RESET_DELAY_MS = 1500

type UseCopyToClipboardOptions = {
  resetDelayMs?: number
}

type UseCopyToClipboardResult = {
  isCopied: boolean
  copy: (value: string) => Promise<boolean>
}

function useCopyToClipboard({
  resetDelayMs = DEFAULT_RESET_DELAY_MS,
}: UseCopyToClipboardOptions = {}): UseCopyToClipboardResult {
  const [isCopied, setIsCopied] = useState(false)
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        clearTimeout(resetTimerRef.current)
      }
    }
  }, [])

  const copy = useCallback(
    async (value: string): Promise<boolean> => {
      try {
        await navigator.clipboard.writeText(value)
      } catch {
        return false
      }

      setIsCopied(true)

      if (resetTimerRef.current !== null) {
        clearTimeout(resetTimerRef.current)
      }

      resetTimerRef.current = setTimeout(() => {
        setIsCopied(false)
      }, resetDelayMs)

      return true
    },
    [resetDelayMs],
  )

  return { copy, isCopied }
}

export { DEFAULT_RESET_DELAY_MS, useCopyToClipboard }
export type { UseCopyToClipboardOptions, UseCopyToClipboardResult }
