import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Check, Copy, Mail, MessageCircle, Phone } from 'lucide-react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import clsx from 'clsx'
import Card from '../components/ui/Card'
import SectionHeader from '../components/ui/SectionHeader'
import Reveal from '../components/ui/Reveal'
import StatusBadge from '../components/ui/StatusBadge'
import MethodBadge from '../components/ui/MethodBadge'
import { highlight } from '../lib/highlight'
import { sendContact, emailConfigured } from '../lib/contact'
import { contact } from '../data/developer'

const RATE_MS = 5000
const field = 'w-full rounded-none border bg-ink px-3 py-2.5 font-mono text-sm text-paper placeholder:text-muted-dark'

function ContactForm() {
  const { t } = useTranslation()
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [busy, setBusy] = useState(false)
  const [res, setRes] = useState(null)
  const [notice, setNotice] = useState('')
  const last = useRef(0)

  const submit = async (v) => {
    if (v.website) return // honeypot
    if (Date.now() - last.current < RATE_MS) {
      setNotice(t('contact.wait'))
      return
    }
    last.current = Date.now()
    setNotice('')
    setBusy(true)
    const r = await sendContact(v)
    setRes(r)
    if (r.status === 201) reset()
    setBusy(false)
  }

  const border = (k) => (errors[k] ? 'border-del' : 'border-sky-line')
  return (
    <Card variant="slate" radius="lg" dir="ltr" className="overflow-hidden">
      <div className="flex items-center gap-3 border-b border-sky-line px-5 py-3">
        <MethodBadge method="POST" />
        <span className="font-mono text-xs">/api/contact</span>
      </div>
      <form onSubmit={handleSubmit(submit)} noValidate className="space-y-3 p-5 text-start">
        <div>
          <input className={clsx(field, border('name'))} placeholder={t('contact.name')} aria-label={t('contact.name')} {...register('name', { required: true })} />
          {errors.name && <p className="mt-1 font-mono text-xs text-del">{t('contact.required')}</p>}
        </div>
        <div>
          <input
            className={clsx(field, border('email'))}
            type="email"
            placeholder={t('contact.email')}
            aria-label={t('contact.email')}
            {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })}
          />
          {errors.email && <p className="mt-1 font-mono text-xs text-del">{errors.email.type === 'pattern' ? t('contact.invalid') : t('contact.required')}</p>}
        </div>
        <div>
          <textarea className={clsx(field, border('message'))} rows={5} placeholder={t('contact.message')} aria-label={t('contact.message')} {...register('message', { required: true })} />
          {errors.message && <p className="mt-1 font-mono text-xs text-del">{t('contact.required')}</p>}
        </div>
        {/* honeypot: hidden from humans and assistive tech */}
        <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -start-[9999px] h-0 w-0 opacity-0" {...register('website')} />
        <button
          type="submit"
          disabled={busy}
          className="min-h-[44px] rounded-full bg-sky px-6 font-mono text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {busy ? t('contact.sending') : t('contact.send')}
        </button>
        {notice && <p role="alert" className="font-mono text-xs text-put">{notice}</p>}
      </form>

      <div aria-live="polite">
        {res && (
          <div className="border-t border-sky-line p-5">
            <div className="mb-3 flex items-center gap-3">
              <StatusBadge code={res.status} text={res.statusText} />
            </div>
            <pre className="overflow-x-auto font-mono text-xs leading-6"><code>{highlight(JSON.stringify(res.data, null, 2))}</code></pre>
            {!emailConfigured && <p className="mt-3 font-mono text-[11px] text-muted-dark">{t('contact.emailjs')}</p>}
          </div>
        )}
      </div>
    </Card>
  )
}

function InfoRow({ icon: Icon, label, value, href, copy, todo }) {
  const { t } = useTranslation()
  const [done, setDone] = useState(false)
  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(copy)
      setDone(true)
      setTimeout(() => setDone(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }
  const body = (
    <>
      <span className="mono-label flex items-center gap-2 text-muted-dark"><Icon size={16} strokeWidth={1.5} />{label}</span>
      <span dir="ltr" className={clsx('mt-2 block break-all text-start', todo && 'font-mono text-xs text-muted-dark')}>{value}</span>
    </>
  )
  return (
    <Card variant="ink" radius="sm" hover={Boolean(href)} className="flex items-center justify-between gap-3 p-5">
      {href ? <a href={href} target="_blank" rel="noreferrer" className="min-w-0 flex-1">{body}</a> : <div className="min-w-0 flex-1">{body}</div>}
      {copy && (
        <button type="button" onClick={doCopy} aria-label={`${t('contact.copy')} ${label}`} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-sky-line">
          {done ? <Check size={16} strokeWidth={1.5} className="text-ok" /> : <Copy size={16} strokeWidth={1.5} />}
        </button>
      )}
    </Card>
  )
}

export default function Contact() {
  const { t } = useTranslation()
  const c = t('contact.cards', { returnObjects: true })
  return (
    <section id="contact" className="relative bg-ink py-16 text-paper md:py-24">
      <div className="grid-texture absolute inset-0" aria-hidden="true" />
      <div className="container relative max-w-page">
        <SectionHeader route={t('contact.tag')} title={t('contact.title')} dark />
        <div className="grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7"><ContactForm /></Reveal>
          <Reveal delay={0.1} className="space-y-4 lg:col-span-5">
            <InfoRow icon={Mail} label={c.email} value={contact.email} href={`mailto:${contact.email}`} copy={contact.email} />
            <InfoRow icon={MessageCircle} label={c.whatsapp} value="+20 109 406 2024" href={contact.whatsapp} />
            <InfoRow icon={Phone} label={c.phone} value={contact.phone} href={`tel:${contact.phone}`} />
            <InfoRow icon={FaLinkedinIn} label={c.linkedin} value={contact.linkedin ?? c.todo} href={contact.linkedin} todo={!contact.linkedin} />
            <InfoRow icon={FaGithub} label={c.github} value={contact.github ?? c.todo} href={contact.github} todo={!contact.github} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
