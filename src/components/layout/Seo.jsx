import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { SITE_URL, contact } from '../../data/developer'

export default function Seo({ lang }) {
  const { t } = useTranslation()
  const url = `${SITE_URL}/${lang}`
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mohamed Rashad',
    jobTitle: 'Full Stack Web Developer',
    url,
    knowsAbout: ['Laravel', 'React', 'PHP', 'REST APIs', 'Inertia.js', 'Redis', 'SQL', 'Vue.js'],
    sameAs: [contact.linkedin, contact.github].filter(Boolean),
  }
  return (
    <Helmet htmlAttributes={{ lang, dir: lang === 'ar' ? 'rtl' : 'ltr' }}>
      <title>{t('meta.title')}</title>
      <meta name="description" content={t('meta.description')} />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="ar" href={`${SITE_URL}/ar`} />
      <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/ar`} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={t('meta.title')} />
      <meta property="og:description" content={t('meta.description')} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t('meta.title')} />
      <meta name="twitter:description" content={t('meta.description')} />
      <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />
      <script type="application/ld+json">{JSON.stringify(ld)}</script>
    </Helmet>
  )
}
