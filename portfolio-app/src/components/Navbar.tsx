'use client';

import { useEffect, useRef, useState } from 'react';

const navLinks = [
  { label: 'About',        href: '#about' },
  { label: 'Education',    href: '#education' },
  { label: 'Skills',       href: '#skills' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Internship',   href: '#internship' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Resume',       href: '#resume' },
  { label: 'Contact',      href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeLink, setActive]   = useState('');
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      // Active link detection
      const sections = navLinks.map(l => document.querySelector(l.href) as HTMLElement);
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && window.scrollY >= sections[i].offsetTop - 120) {
          setActive(navLinks[i].href);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="container-wide flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 group"
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold animate-pulse-glow"
            style={{ background: 'linear-gradient(135deg, var(--cyan), #004466)' }}
          >
            VP
          </div>
          <span
            className="font-display font-bold text-lg tracking-wide hidden sm:block"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Vishnu<span style={{ color: 'var(--cyan)' }}>priya</span>
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeLink === link.href
                    ? 'text-white'
                    : 'text-white/50 hover:text-white/80'
                }`}
                style={
                  activeLink === link.href
                    ? {
                        background: 'rgba(0,212,255,0.12)',
                        border: '1px solid rgba(0,212,255,0.3)',
                        color: 'var(--cyan)',
                      }
                    : {}
                }
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTAs on desktop */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/Vishnu_Priya_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glass text-sm"
            style={{ padding: '8px 18px', background: 'rgba(255,255,255,0.02)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Resume
          </a>
          <a
            href="mailto:vishnupriya.24bme@sonatech.ac.in"
            className="btn-glass text-sm"
            style={{ borderColor: 'rgba(0,212,255,0.3)', color: 'var(--cyan)', padding: '8px 18px' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Contact
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="w-6 h-0.5 bg-white/70 transition-all duration-300"
            style={{ transform: menuOpen ? 'translateY(7px) rotate(45deg)' : '' }}
          />
          <span
            className="w-6 h-0.5 bg-white/70 transition-all duration-300"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="w-6 h-0.5 bg-white/70 transition-all duration-300"
            style={{ transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : '' }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 py-4"
          style={{
            background: 'rgba(3,11,26,0.95)',
            backdropFilter: 'blur(30px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <ul className="flex flex-col gap-1 px-6">
            {navLinks.map(link => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '8px' }}>
              <a
                href="/Vishnu_Priya_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass w-1/2 justify-center"
                style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 0' }}
              >
                Resume
              </a>
              <a
                href="mailto:vishnupriya.24bme@sonatech.ac.in"
                className="btn-glass w-1/2 justify-center"
                style={{ color: 'var(--cyan)', borderColor: 'rgba(0,212,255,0.3)', padding: '10px 0' }}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
