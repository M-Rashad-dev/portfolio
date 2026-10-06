import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { sendContact } from '../../lib/contact'

/** Mini POST /api/contact form used inside the playground. */
export default function ContactMini({ onResult }) {
  const { t } = useTranslation()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [busy, setBusy] = useState(false)

  const submit = async (values) => {
    setBusy(true)
    const t0 = performance.now()
    const res = await sendContact(values)
    onResult({ ...res, ms: Math.round(performance.now() - t0) })
    setBusy(false)
  }

  const field = (k) => `w-full rounded-none border ${errors[k] ? 'border-del' : 'border-sky-line'} bg-ink px-3 py-2 font-mono text-xs text-paper placeholder:text-muted-dark`
  return (
    <form onSubmit={handleSubmit(submit)} className="grid gap-2 border-b border-sky-line p-3 sm:grid-cols-2" noValidate>
      <input className={field('name')} placeholder="name" aria-label="name" {...register('name', { required: true })} />
      <input className={field('email')} placeholder="email" type="email" aria-label="email" {...register('email', { required: true })} />
      <textarea className={`${field('message')} sm:col-span-2`} rows={2} placeholder="message" aria-label="message" {...register('message', { required: true })} />
      <button
        type="submit"
        disabled={busy}
        className="min-h-[44px] rounded-full bg-sky px-5 font-mono text-xs font-medium text-ink disabled:opacity-60 sm:col-span-2 sm:justify-self-start"
      >
        {busy ? t('contact.sending') : 'POST /api/contact'}
      </button>
    </form>
  )
}
