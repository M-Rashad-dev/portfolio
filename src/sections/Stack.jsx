import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  SiHtml5, SiCss, SiJavascript, SiBootstrap, SiTailwindcss, SiReact, SiRedux, SiMui, SiJquery,
  SiVuedotjs, SiPhp, SiLaravel, SiInertia, SiRedis, SiPostman, SiGit, SiGithub,
} from 'react-icons/si'
import { Hash } from 'lucide-react'
import Card from '../components/ui/Card'
import SectionHeader from '../components/ui/SectionHeader'
import Reveal from '../components/ui/Reveal'
import { skills } from '../data/skills'

const ICONS = {
  SiHtml5, SiCss, SiJavascript, SiBootstrap, SiTailwindcss, SiReact, SiRedux, SiMui, SiJquery,
  SiVuedotjs, SiPhp, SiLaravel, SiInertia, SiRedis, SiPostman, SiGit, SiGithub,
}

const GROUPS = [
  ['frontend', 'Front-End'],
  ['backend', 'Back-End'],
  ['tools', 'Tools'],
]

function Chip({ item, index }) {
  const Icon = item.icon ? ICONS[item.icon] : null
  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex min-h-[36px] items-center gap-2 rounded-full border border-sky-line px-3 text-sm transition-colors hover:border-sky hover:bg-sky/10 hover:text-sky"
    >
      {Icon ? <Icon size={16} aria-hidden="true" /> : <Hash size={14} strokeWidth={1.5} aria-hidden="true" />}
      {item.name}
    </motion.li>
  )
}

export default function Stack() {
  const { t } = useTranslation()
  return (
    <section id="stack" className="bg-bg py-16 text-ink md:py-24">
      <div className="container max-w-page">
        <SectionHeader route={t('stack.tag')} title={t('stack.title')} />
        <Reveal>
          <Card variant="ink" radius="lg" dir="ltr" className="overflow-hidden">
            <div className="flex items-center border-b border-sky-line">
              <span className="border-e border-sky-line bg-slate px-4 py-2 font-mono text-xs text-sky">config/stack.php</span>
            </div>
            <div className="space-y-6 p-6 text-start font-mono text-sm md:p-8">
              <p className="text-muted-dark">{'<?php'}</p>
              <p className="text-paper">return [</p>
              {GROUPS.map(([key, label]) => (
                <div key={key} className="ps-4">
                  <p className="mb-3">
                    <span className="text-sky">'{label}'</span> <span className="text-muted-dark">=&gt; [</span>
                  </p>
                  <ul className="flex flex-wrap gap-2 ps-4 font-sans">
                    {skills[key].map((s, i) => (
                      <Chip key={s.name} item={s} index={i} />
                    ))}
                  </ul>
                  <p className="mt-3 text-muted-dark">],</p>
                </div>
              ))}
              <p className="text-paper">];</p>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  )
}
