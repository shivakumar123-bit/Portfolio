import { ArrowUpRight, Github, Linkedin } from 'lucide-react'

export default function Footer() {
  return <footer className="footer"><div className="container footer-inner"><a className="brand" href="#home"><span className="brand-icon">&lt;/&gt;</span><span>Shiva<span className="accent">.dev</span></span></a><p>Designed with curiosity. Built with React.</p><div className="footer-links"><a href="https://github.com/shivakumar123-bit" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="Replace with your LinkedIn"><Linkedin size={18} /></a><a href="#home" aria-label="Back to top"><ArrowUpRight size={18} /></a></div><span className="copyright">© {new Date().getFullYear()} Shiva Kumar Mangalipelli</span></div></footer>
}
