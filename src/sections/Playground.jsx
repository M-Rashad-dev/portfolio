import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Card from '../components/ui/Card'
import SectionHeader from '../components/ui/SectionHeader'
import Reveal from '../components/ui/Reveal'
import EndpointList from '../features/playground/EndpointList'
import RequestBar from '../features/playground/RequestBar'
import ResponseViewer from '../features/playground/ResponseViewer'
import ContactMini from '../features/playground/ContactMini'
import { ENDPOINTS, mockGet } from '../features/playground/mockApi'

export default function Playground() {
  const { t } = useTranslation()
  const [sel, setSel] = useState(0)
  const [url, setUrl] = useState(ENDPOINTS[0].path)
  const [res, setRes] = useState(null)
  const [busy, setBusy] = useState(false)
  const ep = ENDPOINTS[sel]

  const select = (i) => {
    setSel(i)
    setUrl(ENDPOINTS[i].example ?? ENDPOINTS[i].path)
    setRes(null)
  }

  const send = async () => {
    setBusy(true)
    const t0 = performance.now()
    const r = await mockGet(url)
    setRes({ ...r, ms: Math.round(performance.now() - t0) })
    setBusy(false)
  }

  return (
    <section id="playground" className="relative bg-ink py-16 text-paper md:py-24">
      <div className="grid-texture absolute inset-0" aria-hidden="true" />
      <div className="container relative max-w-page">
        <SectionHeader route={t('play.tag')} title={t('play.title')} dark className="mb-4" />
        <p className="mb-10 max-w-xl text-muted-dark">{t('play.intro')}</p>
        <Reveal>
          <Card variant="slate" radius="md" dir="ltr" className="overflow-hidden">
            <div className="grid lg:grid-cols-[280px_1fr]">
              <EndpointList selected={sel} onSelect={select} />
              <div className="min-w-0">
                <RequestBar method={ep.method} url={url} onUrl={setUrl} onSend={send} busy={busy} label={t('play.send')} />
                {ep.method === 'POST' && <ContactMini onResult={setRes} />}
                <ResponseViewer res={res} busy={busy} />
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  )
}
