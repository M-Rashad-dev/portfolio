import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Circle, AppWindow, Building2, DoorOpen, Database, MoveRight } from 'lucide-react'
import clsx from 'clsx'
import SectionHeader from '../components/ui/SectionHeader'
import CodeBlock from '../components/ui/CodeBlock'
import useReducedMotion from '../hooks/useReducedMotion'
import { getLenis } from '../lib/scroll'

const ICONS = [Circle, AppWindow, Building2, DoorOpen, Database, MoveRight]
const N = 6

const STAGE_SNIPPETS = [
  {
    title: 'Stage 01: Client HTTP Request · React / Inertia.js (Front-End)',
    code: `// 1. Client HTTP Request (React + Inertia / REST API)
import { router } from '@inertiajs/react';

export function bookAppointment(data) {
    return router.post('/dashboard/appointments', {
        doctor_id: data.doctorId,
        branch_id: data.branchId,
        date: data.appointmentDate,
        service: 'dental-consultation'
    }, {
        preserveScroll: true,
        onSuccess: () => toast.success('Booking request dispatched!')
    });
}`,
  },
  {
    title: 'Stage 02: Multi-Auth & Role Guards · Laravel Middleware',
    code: `// 2. Multi-Authentication & Role-Based Middleware
Route::middleware(['auth:sanctum', 'role:doctor,center_admin'])
    ->prefix('dashboard')
    ->group(function () {
        Route::get('/appointments', [AppointmentController::class, 'index']);
        Route::post('/appointments', [AppointmentController::class, 'store']);
        Route::patch('/appointments/{id}/status', [AppointmentController::class, 'updateStatus']);
    });`,
  },
  {
    title: 'Stage 03: RESTful Resource Controller · Laravel MVC',
    code: `// 3. AppointmentController: Request Validation & Orchestration
class AppointmentController extends Controller
{
    public function store(AppointmentRequest $request, AppointmentService $service): JsonResponse
    {
        $validated = $request->validated();
        $appointment = $service->createBooking(auth()->user(), $validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Appointment confirmed successfully',
            'data' => new AppointmentResource($appointment)
        ], 201);
    }
}`,
  },
  {
    title: 'Stage 04: Business Logic & Multi-Tenancy · Service Layer',
    code: `// 4. AppointmentService: Business Rules, Tenancy & Transaction
class AppointmentService
{
    public function createBooking(User $patient, array $data): Appointment
    {
        return DB::transaction(function () use ($patient, $data) {
            $this->availabilityChecker->verifySlot($data['doctor_id'], $data['date']);

            return Appointment::create([
                'tenant_id'   => tenant('id'),
                'patient_id'  => $patient->id,
                'doctor_id'   => $data['doctor_id'],
                'branch_id'   => $data['branch_id'],
                'status'      => BookingStatus::CONFIRMED,
            ]);
        });
    }
}`,
  },
  {
    title: 'Stage 05: Data Layer & High-Speed Cache · Redis + Eloquent',
    code: `// 5. Eloquent Model with Redis Caching Layer
class DoctorSchedule extends Model
{
    public static function getAvailableSlots(int $doctorId, string $date): Collection
    {
        $cacheKey = "doctor:{$doctorId}:schedule:{$date}";

        return Redis::remember($cacheKey, now()->addMinutes(15), function () use ($doctorId, $date) {
            return self::where('doctor_id', $doctorId)
                ->whereDate('slot_time', $date)
                ->where('is_booked', false)
                ->orderBy('slot_time')
                ->get();
        });
    }
}`,
  },
  {
    title: 'Stage 06: Response Payload · 200 OK / 97% Speed Score',
    code: `// 6. JSON Response Payload delivered to client (14ms execution)
return response()->json([
    'success' => true,
    'code' => 200,
    'message' => 'Appointment scheduled successfully',
    'meta' => [
        'execution_time' => '14ms',
        'cache_hit' => true,
        'performance_score' => '97%'
    ]
], 200);`,
  },
]

function useDesktop() {
  const [v, setV] = useState(() => window.matchMedia('(min-width: 1024px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const on = () => setV(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return v
}

function MobilePipelineCard({ stage, index, total, onActivate }) {
  const Icon = ICONS[index]
  const [active, setActive] = useState(false)

  return (
    <motion.li
      initial={{ opacity: 0.4, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.45, margin: '-20px 0px -20px 0px' }}
      onViewportEnter={() => {
        setActive(true)
        onActivate?.(index)
      }}
      onViewportLeave={() => setActive(false)}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative ps-10 pb-8 last:pb-0"
    >
      {index < total - 1 && (
        <div
          className={clsx(
            'absolute start-[15px] top-8 bottom-0 w-0.5 transition-colors duration-500',
            active ? 'bg-gradient-to-b from-sky to-sky-line' : 'bg-sky-line/40'
          )}
          aria-hidden="true"
        />
      )}

      <div
        className={clsx(
          'absolute start-1 top-2 grid h-7 w-7 place-items-center rounded-full border transition-all duration-500',
          active
            ? 'border-sky bg-slate text-sky shadow-[0_0_16px_rgba(169,207,221,0.6)] scale-110'
            : 'border-sky-line/60 bg-ink text-muted-dark scale-95'
        )}
        aria-hidden="true"
      >
        <span
          className={clsx(
            'h-2 w-2 rounded-full transition-all duration-300',
            active ? 'bg-sky animate-ping' : 'bg-muted-dark/40'
          )}
        />
      </div>

      <div
        className={clsx(
          'rounded-es-[32px] border p-5 transition-all duration-500 ease-out',
          active
            ? 'bg-gradient-to-br from-slate via-[#28343d] to-[#1c242a] border-sky text-paper shadow-[0_12px_32px_rgba(169,207,221,0.18)] -translate-y-2'
            : 'bg-ink/70 border-sky-line/30 text-paper/70 hover:bg-ink hover:text-paper translate-y-0'
        )}
      >
        <div className="flex items-start justify-between gap-3 mb-2">
          <p className={clsx('flex items-center gap-2 font-mono text-sm font-medium transition-colors duration-300', active ? 'text-sky' : 'text-paper')}>
            <Icon size={18} strokeWidth={1.5} className="rtl:rotate-180" />
            <span dir="ltr">{stage.name}</span>
          </p>
          <span className={clsx('num text-2xl transition-colors duration-300', active ? 'text-sky' : 'text-muted-dark')}>
            0{index + 1}
          </span>
        </div>
        <p className={clsx('text-sm leading-relaxed transition-colors duration-300', active ? 'text-paper' : 'text-muted-dark')}>
          {stage.text}
        </p>
      </div>
    </motion.li>
  )
}

/** Desktop Side-by-Side Pipeline with Dynamic Code Synchronizer */
function DesktopPipeline({ stages, active, onCardClick }) {
  const lineRef = useRef(null)
  const packetRef = useRef(null)

  useEffect(() => {
    if (!lineRef.current || !packetRef.current) return
    const w = lineRef.current.clientWidth
    const rtl = document.documentElement.dir === 'rtl'
    const x = ((active + 0.5) / N) * w * (rtl ? -1 : 1)
    packetRef.current.style.transform = `translateX(${x}px)`
  }, [active])

  return (
    <div className="w-full space-y-5">
      {/* Top Track Line with traveling packet */}
      <div ref={lineRef} className="relative w-full">
        <div className="absolute inset-x-0 top-3 h-0.5 bg-sky-line/40" aria-hidden="true" />
        <span
          ref={packetRef}
          aria-hidden="true"
          className="absolute start-0 top-[7px] -ms-2 h-3.5 w-3.5 rounded-full bg-sky shadow-[0_0_16px_4px_rgba(169,207,221,0.7)] transition-transform duration-300 ease-out z-20 pointer-events-none"
        />
      </div>

      {/* 6 Stage Cards Side-by-Side */}
      <div className="grid grid-cols-6 gap-3 lg:gap-3.5 items-stretch pt-1">
        {stages.map((s, i) => {
          const Icon = ICONS[i]
          const on = i === active
          return (
            <button
              key={s.name}
              type="button"
              onClick={() => onCardClick(i)}
              className={clsx(
                'group relative flex flex-col justify-between text-start p-3.5 rounded-es-[22px] border transition-all duration-300 ease-out min-h-[155px]',
                on
                  ? 'bg-gradient-to-br from-slate via-[#28343d] to-[#1c242a] border-sky text-paper shadow-[0_10px_28px_rgba(169,207,221,0.25)] -translate-y-2 z-10'
                  : 'bg-ink/75 border-sky-line/35 text-paper/70 hover:bg-slate/70 hover:border-sky/50 hover:text-paper translate-y-0',
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span
                    className={clsx(
                      'grid h-7 w-7 place-items-center rounded-lg border transition-colors',
                      on ? 'border-sky bg-sky/15 text-sky' : 'border-sky-line/40 bg-ink/60 text-muted-dark group-hover:text-paper',
                    )}
                  >
                    <Icon size={15} strokeWidth={1.5} className="rtl:rotate-180" />
                  </span>
                  <span className={clsx('num text-lg transition-colors', on ? 'text-sky' : 'text-muted-dark/80')}>
                    0{i + 1}
                  </span>
                </div>

                <p dir="ltr" className={clsx('font-mono text-xs font-semibold mb-1 transition-colors', on ? 'text-sky' : 'text-paper')}>
                  {s.name}
                </p>

                <p className={clsx('text-[11px] leading-relaxed line-clamp-3 transition-colors', on ? 'text-paper' : 'text-muted-dark')}>
                  {s.text}
                </p>
              </div>

              {/* Active Indicator Bar */}
              <div className="mt-2.5 pt-2 border-t border-sky-line/20 flex items-center justify-between text-[10px] font-mono text-muted-dark">
                <span className={on ? 'text-sky font-medium' : ''}>{on ? 'Active' : 'Click to inspect'}</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function Architecture() {
  const { t } = useTranslation()
  const stages = t('arch.stages', { returnObjects: true })
  const desktop = useDesktop()
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const rootRef = useRef(null)
  const stRef = useRef(null)

  useEffect(() => {
    if (!desktop || reduced) return undefined
    let st
    let off
    let cancelled = false

    ;(async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      const lenis = getLenis()
      if (lenis) {
        lenis.on('scroll', ScrollTrigger.update)
        off = () => lenis.off('scroll', ScrollTrigger.update)
      }

      // Pin the section on desktop while user scrolls through the 6 pipeline stages
      st = ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top top',
        end: '+=1600',
        pin: true,
        pinSpacing: true,
        scrub: 0.3,
        anticipatePin: 1,
        onUpdate: (self) => {
          const index = Math.min(N - 1, Math.floor(self.progress * N))
          setActive(index)
        },
      })
      stRef.current = st
      ScrollTrigger.refresh()
    })()

    return () => {
      cancelled = true
      st?.kill()
      stRef.current?.kill()
      stRef.current = null
      off?.()
    }
  }, [desktop, reduced])

  const handleCardClick = (i) => {
    setActive(i)
    if (stRef.current) {
      const progress = (i + 0.5) / N
      const target = stRef.current.start + progress * (stRef.current.end - stRef.current.start)
      const lenis = getLenis()
      if (lenis) {
        lenis.scrollTo(target)
      } else {
        window.scrollTo({ top: target, behavior: 'smooth' })
      }
    }
  }

  const currentSnippet = STAGE_SNIPPETS[active] || STAGE_SNIPPETS[0]

  return (
    <section
      id="architecture"
      ref={rootRef}
      className="relative bg-slate text-paper min-h-screen flex flex-col justify-center py-12 lg:pt-20 lg:pb-12"
    >
      <div className="grid-texture absolute inset-0" aria-hidden="true" />
      <div className="container relative max-w-page space-y-6">
        {/* Section Header with compact margins and Stage badge */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeader route={t('arch.tag')} title={t('arch.title')} dark className="mb-0" />
          <div className="hidden lg:flex items-center gap-2 font-mono text-xs text-muted-dark pb-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ink/70 border border-sky-line/40 text-sky">
              <span className="h-2 w-2 rounded-full bg-sky animate-ping" />
              <span>{stages[active]?.name || `Stage 0${active + 1}`}</span>
              <span className="text-muted-dark ms-1">({active + 1}/{N})</span>
            </span>
          </div>
        </div>

        {/* Desktop Side-by-Side Cards or Mobile Stepper */}
        {desktop ? (
          <DesktopPipeline
            stages={stages}
            active={active}
            onCardClick={handleCardClick}
          />
        ) : (
          <ol className="relative space-y-2 py-2">
            {stages.map((s, i) => (
              <MobilePipelineCard
                key={s.name}
                stage={s}
                index={i}
                total={stages.length}
                onActivate={(idx) => setActive(idx)}
              />
            ))}
          </ol>
        )}

        {/* Dynamic Synchronized CodeBlock based on Active Stage (Desktop Only) */}
        <div className="hidden lg:block pt-1">
          <div className="flex items-center justify-between text-xs font-mono text-muted-dark mb-2 px-1">
            <div className="flex items-center gap-2">
              <span className="text-sky font-semibold">Active Pipeline Stage:</span>
              <span className="text-paper">{stages[active]?.name}</span>
            </div>
            <span className="hidden sm:inline text-sky-line">Scroll to advance · Click card to jump</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <CodeBlock
                title={currentSnippet.title}
                code={currentSnippet.code}
                lineNumbers
                className="rounded-es-[28px] sm:rounded-es-[36px] shadow-2xl border-sky-line/50"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
