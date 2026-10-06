import { Command } from 'cmdk'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { scrollToId } from '../../lib/scroll'
import { contact } from '../../data/developer'

const GO = ['about', 'architecture', 'playground', 'projects', 'journey', 'contact']

export default function CommandPalette({ open, onOpenChange }) {
  const { t } = useTranslation()
  const { lang } = useParams()
  const navigate = useNavigate()

  const run = (fn) => () => {
    onOpenChange(false)
    setTimeout(fn, 150)
  }

  const commands = [
    ...GO.map((id) => ({ name: `go:${id}`, run: () => scrollToId(id) })),
    {
      name: 'cv:download',
      run: () => {
        const a = document.createElement('a')
        a.href = contact.cv
        a.download = ''
        a.click()
      },
    },
    {
      name: 'lang:toggle',
      run: () => {
        const next = lang === 'ar' ? 'en' : 'ar'
        try {
          localStorage.setItem('lang', next)
        } catch {
          /* ignore */
        }
        navigate(`/${next}`)
      },
    },
    { name: 'copy:email', run: () => navigator.clipboard?.writeText(contact.email) },
  ]

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label={t('palette.title')}
      overlayClassName="dlg-overlay fixed inset-0 z-[95] bg-ink/70 backdrop-blur-sm"
      contentClassName="dlg-content fixed inset-x-4 top-[15vh] z-[96] mx-auto w-auto max-w-xl overflow-hidden rounded-es-[48px] border border-sky-line bg-slate text-paper"
    >
      <div dir="ltr">
        <Command.Input
          autoFocus
          placeholder={t('palette.placeholder')}
          className="w-full border-b border-sky-line bg-transparent px-5 py-4 font-mono text-sm text-paper outline-none placeholder:text-muted-dark"
        />
        <Command.List className="max-h-[50vh] overflow-y-auto p-2">
          <Command.Empty className="p-4 font-mono text-xs text-muted-dark">{t('palette.empty')}</Command.Empty>
          {commands.map((c) => (
            <Command.Item
              key={c.name}
              value={c.name}
              onSelect={run(c.run)}
              className="flex min-h-[44px] cursor-pointer items-center gap-2 px-4 font-mono text-sm text-muted-dark data-[selected=true]:bg-sky/15 data-[selected=true]:text-sky"
            >
              <span className="text-muted-dark">php artisan</span> {c.name}
            </Command.Item>
          ))}
        </Command.List>
      </div>
    </Command.Dialog>
  )
}
