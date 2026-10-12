import { Braces, Database, PanelsTopLeft, Wrench } from 'lucide-react'

const groups = [
  { icon: Braces, title: 'Languages', skills: ['Python', 'JavaScript', 'SQL'] },
  { icon: PanelsTopLeft, title: 'Frontend', skills: ['HTML5', 'CSS3', 'Bootstrap', 'React', 'Responsive UI'] },
  { icon: Database, title: 'Backend & databases', skills: ['Flask — learning', 'REST APIs — learning', 'MySQL'] },
  { icon: Wrench, title: 'Tools & analytics', skills: ['Git', 'GitHub', 'VS Code', 'Power BI', 'Excel'] },
]

export default function Skills() {
  return <section className="section section-border" id="skills"><div className="container"><div className="section-heading reveal"><p className="eyebrow">MY TOOLKIT</p><h2>Skills I use to<br /><span className="text-gradient">build and learn.</span></h2><p className="section-intro">A growing toolkit for creating useful, maintainable applications. I’m continually expanding it through practice.</p></div><div className="skills-grid">{groups.map(({ icon: Icon, title, skills }, i) => <article className={`skill-card reveal reveal-delay-${(i % 3) + 1}`} key={title}><div className="skill-card-top"><span className="skill-icon"><Icon size={21} /></span><span className="skill-index">0{i + 1}</span></div><h3>{title}</h3><div className="skill-tags">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></article>)}</div></div></section>
}
