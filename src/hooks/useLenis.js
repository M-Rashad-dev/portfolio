import { useEffect } from 'react'
import { initLenis } from '../lib/scroll'

export default function useLenis() {
  useEffect(() => {
    initLenis()
  }, [])
}
