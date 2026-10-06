import { developer } from '../../data/developer'
import { skills } from '../../data/skills'
import { experience } from '../../data/experience'
import { projects } from '../../data/projects'

export const ENDPOINTS = [
  { method: 'GET', path: '/api/developer' },
  { method: 'GET', path: '/api/skills' },
  { method: 'GET', path: '/api/experience' },
  { method: 'GET', path: '/api/projects' },
  { method: 'GET', path: '/api/projects/{slug}', example: '/api/projects/medical-booking' },
  { method: 'POST', path: '/api/contact' },
]

const delay = () => new Promise((r) => setTimeout(r, 150 + Math.random() * 250))

function resolve(path) {
  const p = path.replace(/\/+$/, '')
  if (p === '/api/developer') return developer
  if (p === '/api/skills') return skills
  if (p === '/api/experience') return experience
  if (p === '/api/projects') return projects
  const m = p.match(/^\/api\/projects\/([\w-]+)$/)
  if (m) return projects.find((x) => x.slug === m[1]) ?? null
  return null
}

/** Resolves the real data files after a random 150-400ms delay. */
export async function mockGet(path) {
  await delay()
  const data = resolve(path)
  if (data === null) return { status: 404, statusText: 'Not Found', data: { message: 'Not Found' } }
  return { status: 200, statusText: 'OK', data }
}
