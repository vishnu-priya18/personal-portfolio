'use client';

import { useEffect, useRef } from 'react';

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap }          = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        gsap.fromTo('.footer-content', { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '#footer', start: 'top 90%' },
        });
      }, sectionRef);
      return () => ctx.revert();
    };
    init();
  }, []);

  const socials = [
    {
      name: 'GitHub',
      href: 'https://github.com/vishnu-priya18',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/vishnu-priya-01372931a',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ),
    },
    {
      name: 'Email',
      href: 'mailto:vishnupriya.24bme@sonatech.ac.in',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
    },
  ];

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

  return (
    <footer id="footer" ref={sectionRef as any}>
      {/* CTA Banner */}
      <div className="container-wide mb-0">
        <div
          className="rounded-3xl p-10 md:p-16 text-center mb-0"
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(255,107,53,0.06))',
            border: '1px solid rgba(0,212,255,0.15)',
          }}
        >
          <p className="section-label mb-4">Get In Touch</p>
          <h2
            className="font-display font-bold mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem,4vw,3rem)',
            }}
          >
            Let's Build the Future of{' '}
            <span style={{ color: 'var(--cyan)' }}>Healthcare</span>
          </h2>
          <p className="text-white/55 max-w-lg mx-auto mb-8 text-base leading-relaxed">
            Open to internships, research collaborations, and innovative biomedical engineering projects.
            Let's connect and create something meaningful.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:vishnupriya.24bme@sonatech.ac.in"
              className="btn-glass btn-primary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Send an Email
            </a>
            <a
              href="https://www.linkedin.com/in/vishnu-priya-01372931a"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <div
        className="footer-content"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(3,11,26,0.9)',
          opacity: 0,
          marginTop: '80px',
          padding: '40px 0',
        }}
      >
        <div className="container-wide">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: 'linear-gradient(135deg, var(--cyan), #004466)' }}
              >
                VP
              </div>
              <span className="text-white/50 text-sm">
                Vishnu Priya · Biomedical Engineering
              </span>
            </div>

            {/* Nav links */}
            <nav className="flex flex-wrap justify-center gap-4">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs text-white/35 hover:text-white/70 transition-colors duration-200"
                  onClick={e => {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  target={s.name !== 'Email' ? '_blank' : undefined}
                  rel={s.name !== 'Email' ? 'noopener noreferrer' : undefined}
                  aria-label={s.name}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-6 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <p className="text-xs text-white/20" style={{ fontFamily: 'var(--font-mono)' }}>
              © 2024–2028 Vishnu Priya · Sona College of Technology · Biomedical Engineering
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
