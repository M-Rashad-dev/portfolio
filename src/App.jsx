import { lazy, Suspense, useEffect, useLayoutEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { LANGS, getStoredLang } from './i18n'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import BootLoader from './components/layout/BootLoader'
import Seo from './components/layout/Seo'
import Hero from './sections/Hero'
import About from './sections/About'
import Architecture from './sections/Architecture'
import Projects from './sections/Projects'
import Stack from './sections/Stack'
import Journey from './sections/Journey'
import Contact from './sections/Contact'
import useLenis from './hooks/useLenis'

const Playground = lazy(() => import('./sections/Playground'))
const CommandPalette = lazy(() => import('./components/layout/CommandPalette'))

function Site() {
  const { lang } = useParams()
  const { t, i18n } = useTranslation()
  const [palette, setPalette] = useState(false)
  const valid = LANGS.includes(lang)
  useLenis()

  useLayoutEffect(() => {
    if (!valid) return
    if (i18n.language !== lang) i18n.changeLanguage(lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* ignore */
    }
  }, [lang, valid, i18n])

  useEffect(() => {
    const on = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPalette((v) => !v)
      }
    }
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  }, [])

  if (!valid) return <Navigate to={`/${getStoredLang()}`} replace />

  return (
    <>
      <Seo lang={lang} />
      <a href="#about" className="skip-link">{t('skip')}</a>
      <BootLoader />
      <Navbar onPalette={() => setPalette(true)} />
      <main id="main">
        <Hero />
        <About />
        <Architecture />
        <Suspense fallback={<section id="playground" className="min-h-[60vh] bg-ink" />}>
          <Playground />
        </Suspense>
        <Projects />
        <Stack />
        <Journey />
        <Contact />
      </main>
      <Footer />
      {palette && (
        <Suspense fallback={null}>
          <CommandPalette open={palette} onOpenChange={setPalette} />
        </Suspense>
      )}
    </>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={`/${getStoredLang()}`} replace />} />
          <Route path="/:lang" element={<Site />} />
          <Route path="*" element={<Navigate to={`/${getStoredLang()}`} replace />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}
