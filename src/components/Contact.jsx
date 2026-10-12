import { useState } from 'react'
import { ArrowUpRight, Mail, MapPin, Send } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [sending, setSending] = useState(false)
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  async function handleSubmit(event) {
    event.preventDefault()
    setSending(true)
    setStatus({ type: '', message: '' })
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to send your message right now.')
      setStatus({ type: 'success', message: 'Thanks! Your message was sent successfully.' })
      setForm({ name: '', email: '', message: '' })
    } catch (error) {
      setStatus({ type: 'error', message: `${error.message} Check that the contact backend is running and configured.` })
    } finally { setSending(false) }
  }

  return <section className="section section-border" id="contact"><div className="container"><div className="contact-panel"><div className="contact-copy reveal"><p className="eyebrow">HAVE AN OPPORTUNITY?</p><h2>Let’s build<br /><span className="text-gradient">something useful.</span></h2><p>I’m interested in entry-level opportunities, collaborative projects and connecting with people in tech. Send me a message.</p><a className="contact-detail" href="mailto:mangalipellishivakumar908@gmail.com"><Mail size={18} /><span>mangalipellishivakumar908@gmail.com</span><ArrowUpRight size={15} /></a><div className="contact-detail"><MapPin size={18} /><span>Telangana, India · Open to suitable opportunities</span></div></div><form className="contact-form reveal reveal-delay-1" onSubmit={handleSubmit}><div className="form-heading"><h3>Send a message</h3><span>Usually takes less than a minute</span></div><label htmlFor="name">Your name</label><input id="name" name="name" value={form.name} onChange={update} placeholder="Enter your name" required minLength={2} maxLength={100} /><label htmlFor="email">Email address</label><input id="email" name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" required maxLength={254} /><label htmlFor="message">Message</label><textarea id="message" name="message" value={form.message} onChange={update} placeholder="Tell me what you have in mind..." required minLength={5} maxLength={5000} rows={4} /><button className="button button-primary submit-button" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send message'} <Send size={16} /></button>{status.message && <p className={`form-status ${status.type}`} role="status">{status.message}</p>}<p className="form-hint">For local testing, start the Flask backend using the instructions in README.md.</p></form></div></div></section>
}
