import emailjs from '@emailjs/browser'

const SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID // TODO: owner supplies EmailJS keys
const TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export const emailConfigured = Boolean(SERVICE && TEMPLATE && KEY)

/** Sends through EmailJS and resolves with a 201-style JSON response. */
export async function sendContact({ name, email, message }) {
  try {
    if (emailConfigured) {
      await emailjs.send(SERVICE, TEMPLATE, { from_name: name, reply_to: email, message }, { publicKey: KEY })
    } else {
      await new Promise((r) => setTimeout(r, 300)) // simulated until keys exist
    }
    return {
      status: 201,
      statusText: 'Created',
      data: { message: 'Message received', simulated: !emailConfigured, data: { name, email } },
    }
  } catch (err) {
    return { status: 500, statusText: 'Server Error', data: { message: String(err?.text || err?.message || err) } }
  }
}
