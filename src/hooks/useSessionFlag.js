import { useCallback, useState } from 'react'

/** Boolean flag persisted in sessionStorage. */
export default function useSessionFlag(key) {
  const [flag, setFlag] = useState(() => {
    try {
      return sessionStorage.getItem(key) === '1'
    } catch {
      return false
    }
  })
  const set = useCallback(() => {
    try {
      sessionStorage.setItem(key, '1')
    } catch {
      /* storage unavailable */
    }
    setFlag(true)
  }, [key])
  return [flag, set]
}
