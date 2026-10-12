import { useState } from 'react'
import { Menu, X, Code2 } from 'lucide-react'

const links = [
  ['About', '#about'], ['Skills', '#skills'], ['Projects', '#projects'],
  ['Education', '#education'], ['Contact', '#contact'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const closeMenu = () => setOpen(false)
  return (
    <header className="site-header">
      <nav className="nav container" aria-label="Main navigation">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Shiva Kumar home">
          <span className="brand-icon"><Code2 size={19} /></span><span>Shiva<span className="accent">.dev</span></span>
        </a>
        <button className="menu-toggle" type="button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
        <div className={`nav-links ${open ? 'nav-links-open' : ''}`}>
          {links.map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Let’s talk <span>↗</span></a>
        </div>
      </nav>
    </header>
  )
}
