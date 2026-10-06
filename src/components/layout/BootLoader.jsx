import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2, CheckCircle2, Terminal } from 'lucide-react'
import { prefersReducedMotion } from '../../hooks/useReducedMotion'

const LIFECYCLE_STEPS = [
  {
    pct: 25,
    en: 'Initiating client handshake & headers...',
    ar: 'بدء دورة حياة الطلب وتأكيد الاتصال...',
  },
  {
    pct: 55,
    en: 'Booting Laravel services & Redis cache...',
    ar: 'تشغيل خدمات Laravel وقواعد البيانات...',
  },
  {
    pct: 85,
    en: 'Mounting React.js architecture & UI...',
    ar: 'تجهيز واجهات React.js والمشاريع...',
  },
  {
    pct: 100,
    en: 'HTTP 200 OK — Portfolio ready',
    ar: 'النظام جاهز للعرض · HTTP 200 OK',
  },
]

export default function BootLoader() {
  const { i18n } = useTranslation()
  const lang = i18n.language
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(() => !prefersReducedMotion())
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (!visible) return undefined

    // Smooth progress increment from 0 to 100
    const start = performance.now()
    const duration = 1350 // ~1.35s total animation time
    let reqId

    const tick = (now) => {
      const elapsed = now - start
      const p = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(p)

      if (p < 100) {
        reqId = requestAnimationFrame(tick)
      } else {
        // Hold on 100% briefly, then trigger exit transition
        const timer = setTimeout(() => setLeaving(true), 220)
        return () => clearTimeout(timer)
      }
    }

    reqId = requestAnimationFrame(tick)

    const onKey = () => setLeaving(true)
    window.addEventListener('keydown', onKey)

    return () => {
      cancelAnimationFrame(reqId)
      window.removeEventListener('keydown', onKey)
    }
  }, [visible])

  if (!visible) return null

  // Determine current step based on progress
  const currentStep =
    progress < 25
      ? LIFECYCLE_STEPS[0]
      : progress < 55
      ? LIFECYCLE_STEPS[1]
      : progress < 88
      ? LIFECYCLE_STEPS[2]
      : LIFECYCLE_STEPS[3]

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          role="status"
          aria-label="Loading"
          onClick={() => setLeaving(true)}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
          onAnimationComplete={() => {
            if (leaving) setVisible(false)
          }}
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-ink px-4 text-paper select-none"
        >
          {/* Ambient radial glow & background texture */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(169,207,221,0.12),transparent_70%)]"
            aria-hidden="true"
          />
          <div className="grid-texture pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

          {/* Central Terminal Card */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg rounded-es-[32px] sm:rounded-es-[40px] border border-sky-line/45 bg-slate/95 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_24px_64px_rgba(0,0,0,0.7),0_0_40px_rgba(169,207,221,0.12)] text-start overflow-hidden"
          >
            {/* Top Bar: Monogram + Terminal Route Header */}
            <div className="flex items-center justify-between border-b border-sky-line/30 pb-4 mb-5" dir="ltr">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink border border-sky-line/60 text-sky shadow-[0_0_12px_rgba(169,207,221,0.3)]">
                  <Code2 size={16} />
                </span>
                <span className="font-mono text-xs font-semibold text-paper tracking-wider">
                  MOHAMED RASHAD
                </span>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1 rounded-full bg-ink/80 border border-sky-line/40">
                <span className="h-1.5 w-1.5 rounded-full bg-ok animate-pulse" />
                <span className="text-ok font-medium">200 OK</span>
              </div>
            </div>

            {/* Lifecycle Route Endpoint */}
            <div className="flex items-center gap-2 font-mono text-xs mb-5 text-muted-dark" dir="ltr">
              <span className="px-2 py-0.5 rounded bg-sky/15 text-sky font-bold text-[11px] border border-sky/30">
                GET
              </span>
              <span className="text-paper">/handshake/lifecycle</span>
              <span className="ms-auto text-sky-line text-[11px]">HTTP/2.0</span>
            </div>

            {/* Active Step Ticker */}
            <div className="min-h-[44px] flex items-center gap-3 font-mono text-xs sm:text-sm text-paper mb-5">
              <span className="text-sky shrink-0">
                {progress < 100 ? (
                  <Terminal size={16} className="animate-pulse" />
                ) : (
                  <CheckCircle2 size={16} className="text-ok" />
                )}
              </span>
              <span className="leading-snug truncate">
                {currentStep[lang === 'ar' ? 'ar' : 'en']}
              </span>
            </div>

            {/* Glowing Progress Track */}
            <div className="space-y-2">
              <div className="h-2 w-full overflow-hidden rounded-full bg-ink border border-sky-line/40 p-0.5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-sky via-[#92d0e6] to-ok shadow-[0_0_12px_rgba(169,207,221,0.7)]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between font-mono text-[11px] text-muted-dark pt-1" dir="ltr">
                <span>Request Lifecycle</span>
                <span className="font-bold text-sky text-xs">{progress}%</span>
              </div>
            </div>

            {/* Skip Prompt */}
            <div className="mt-5 pt-3 border-t border-sky-line/20 text-center">
              <span className="font-mono text-[11px] text-muted-dark/80 hover:text-sky transition-colors">
                {lang === 'ar' ? 'اضغط في أي مكان للمتابعة السريعة' : 'Click anywhere to skip'}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
