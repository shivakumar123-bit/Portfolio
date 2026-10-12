import { useEffect, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Download, Github, Linkedin } from 'lucide-react'

const roles = ['Python Full Stack Developer', 'React Developer', 'Python Developer']

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let delay = deleting ? 42 : 85
    if (!deleting && typed === current) delay = 1500
    if (deleting && typed === '') {
      delay = 350
      const timer = setTimeout(() => { setDeleting(false); setRoleIndex((i) => (i + 1) % roles.length) }, delay)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(() => {
      if (!deleting && typed === current) setDeleting(true)
      else setTyped(deleting ? current.slice(0, typed.length - 1) : current.slice(0, typed.length + 1))
    }, delay)
    return () => clearTimeout(timer)
  }, [typed, deleting, roleIndex])

  return (
    <section className="hero section" id="home">
      <div className="hero-grid container">
        <div className="hero-copy reveal">
          <div className="availability"><span className="status-dot" /> OPEN TO ENTRY-LEVEL OPPORTUNITIES</div>
          <p className="eyebrow">HELLO, I’M</p>
          <h1>Shiva Kumar<br /><span className="text-gradient">Mangalipelli.</span></h1>
          <div className="role-line"><span className="role-prefix">I build as a</span> <span className="typed-role">{typed}<span className="typing-cursor">|</span></span></div>
          <p className="hero-description">A Computer Science graduate learning to turn ideas into useful, responsive web experiences with Python and modern frontend technologies.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">Explore my work <ArrowUpRight size={17} /></a>
            <a className="button button-outline" href="./resume.pdf" download="Shiva_Kumar_Resume.pdf"><Download size={17} /> Download resume</a>
          </div>
          <div className="hero-socials">
            <span>FIND ME ON</span>
            <a href="https://github.com/shivakumar123-bit" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={19} /></a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn — replace with your profile"><Linkedin size={19} /></a>
          </div>
        </div>
        <div className="hero-visual reveal reveal-delay">
          <div className="photo-orbit orbit-one" /><div className="photo-orbit orbit-two" />
          <div className="photo-frame">
            <img src="/images/profile.jpg" alt="Shiva Kumar Mangalipelli" onError={(event) => { event.currentTarget.style.display = 'none'; event.currentTarget.nextElementSibling.style.display = 'grid' }} />
            <div className="photo-fallback"><span>SK</span><small>Add your photo</small></div>
          </div>
          <div className="floating-card card-code"><span className="mini-icon">{`</>`}</span><div><strong>Clean code</strong><small>Built with curiosity</small></div></div>
          <div className="floating-card card-stack"><span className="stack-dot" /><div><strong>Python + React</strong><small>Learning by building</small></div></div>
          <div className="hero-scroll"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={17} /></div>
        </div>
      </div>
      <div className="hero-bottom-line" />
    </section>
  )
}
