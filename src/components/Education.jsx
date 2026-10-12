import { GraduationCap, BookOpen } from 'lucide-react'

const education = [
  { icon: GraduationCap, date: 'BACHELOR’S DEGREE', title: 'B.Tech — Computer Science & Engineering', place: 'Guru Nanak Institute of Technology · Telangana', detail: 'Completed' },
  { icon: BookOpen, date: 'PROFESSIONAL TRAINING', title: 'Python Full Stack Development', place: 'Fortune IT Institute', detail: 'Currently learning' },
]

export default function Education() {
  return <section className="section section-border" id="education"><div className="container education-layout"><div className="section-heading reveal"><p className="eyebrow">MY JOURNEY</p><h2>Learning is<br /><span className="text-gradient">always in progress.</span></h2><p className="section-intro">My academic foundation and current professional training.</p></div><div className="timeline">{education.map(({ icon: Icon, date, title, place, detail }, i) => <article className={`timeline-item reveal reveal-delay-${i + 1}`} key={title}><span className="timeline-icon"><Icon size={20} /></span><div className="timeline-content"><p className="timeline-date">{date}</p><h3>{title}</h3><p>{place}</p><span className="timeline-status">{detail}</span></div></article>)}</div></div></section>
}
