import { ArrowUpRight, GraduationCap, Lightbulb, Target } from 'lucide-react'

const highlights = [
  { icon: GraduationCap, title: 'Computer Science graduate', text: 'B.Tech in Computer Science & Engineering.' },
  { icon: Lightbulb, title: 'Always learning', text: 'Currently developing Python Full Stack skills.' },
  { icon: Target, title: 'Focused on growth', text: 'Building practical projects and improving every day.' },
]

export default function About() {
  return (
    <section className="section section-border" id="about">
      <div className="container">
        <div className="section-heading reveal"><p className="eyebrow">A LITTLE ABOUT ME</p><h2>Curious mind.<br /><span className="text-gradient">Builder mindset.</span></h2></div>
        <div className="about-layout">
          <div className="about-text reveal"><p className="lead">I’m an aspiring Python Full Stack Developer who enjoys learning how technology can solve real problems.</p><p>I completed my B.Tech in Computer Science & Engineering and am continuing my learning journey in Python Full Stack development at Fortune IT Institute. I’m strengthening my skills by building projects, practising problem-solving, and learning to create applications from frontend to backend.</p><p>I’m looking for an entry-level opportunity where I can contribute, learn from experienced developers, and grow with a team.</p><a className="text-link" href="#contact">Let’s connect <ArrowUpRight size={16} /></a></div>
          <div className="about-highlights">{highlights.map(({ icon: Icon, title, text }, i) => <article className={`highlight-card reveal reveal-delay-${i + 1}`} key={title}><span className="highlight-icon"><Icon size={20} /></span><div><h3>{title}</h3><p>{text}</p></div><span className="highlight-number">0{i + 1}</span></article>)}</div>
        </div>
      </div>
    </section>
  )
}
