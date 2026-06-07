'use client';

import { useEffect, useRef, useState } from 'react';

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap }          = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        gsap.fromTo('.contact-item-card', { opacity: 0, x: -30 }, {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: '#contact', start: 'top 80%' },
        });
        gsap.fromTo('.contact-form-card', { opacity: 0, x: 30 }, {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '#contact', start: 'top 80%' },
        });
      }, sectionRef);
      return () => ctx.revert();
    };
    init();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('Please fill in all fields.');
      return;
    }
    // Simulate API call
    setStatus('Sending your message...');
    setTimeout(() => {
      setStatus('Thank you! Your message has been sent successfully.');
      setFormData({ name: '', email: '', message: '' });
    }, 1200);
  };

  const contactLinks = [
    {
      name: 'Email',
      value: 'vishnupriya.24bme@sonatech.ac.in',
      href: 'mailto:vishnupriya.24bme@sonatech.ac.in',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      color: 'var(--cyan)',
      glow: 'rgba(0,212,255,0.15)',
    },
    {
      name: 'LinkedIn',
      value: 'vishnu-priya-01372931a',
      href: 'https://www.linkedin.com/in/vishnu-priya-01372931a',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ),
      color: '#3b82f6',
      glow: 'rgba(59,130,246,0.15)',
    },
    {
      name: 'GitHub',
      value: 'vishnu-priya18',
      href: 'https://github.com/vishnu-priya18',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      ),
      color: '#a855f7',
      glow: 'rgba(168,85,247,0.15)',
    },
    {
      name: 'Instagram',
      value: 'vishnupriya_18',
      href: 'https://instagram.com/vishnupriya_18',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      ),
      color: '#ec4899',
      glow: 'rgba(236,72,153,0.15)',
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="section-wrapper">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,212,255,0.04), transparent)',
        }}
      />

      <div className="container-wide relative">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">09 — Contact Section</p>
          <h2
            className="font-display font-bold mb-4"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,3rem)' }}
          >
            Start a <span style={{ color: 'var(--orange)' }}>Conversation</span>
          </h2>
          <div className="gradient-divider mt-6" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Socials & Info (Left Column) */}
          <div className="lg:col-span-5 space-y-4">
            {contactLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target={link.name !== 'Email' ? '_blank' : undefined}
                rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                className="contact-item-card glass p-5 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:scale-[1.01] border border-white/5 hover:border-white/10 group block"
                style={{ opacity: 0 }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white/80 group-hover:text-white transition-all"
                  style={{
                    background: `${link.color}15`,
                    border: `1px solid ${link.color}35`,
                    boxShadow: `0 0 10px ${link.color}10`,
                  }}
                >
                  {link.icon}
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-white/40 block font-mono">
                    {link.name}
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-white/85 group-hover:text-white transition-colors duration-200">
                    {link.value}
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Contact Form (Right Column) */}
          <div className="lg:col-span-7">
            <div
              className="contact-form-card glass-strong p-6 md:p-8 rounded-3xl border border-white/10"
              style={{ opacity: 0 }}
            >
              <h3 className="font-bold text-white text-lg mb-6 font-display" style={{ fontFamily: 'var(--font-display)' }}>
                Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="form-name" className="text-[10px] uppercase tracking-wider text-white/50 block mb-1.5 font-mono">
                    Full Name
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-cyan/50 focus:bg-white/10 rounded-xl px-4 py-3 text-xs md:text-sm text-white placeholder-white/20 outline-none transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="form-email" className="text-[10px] uppercase tracking-wider text-white/50 block mb-1.5 font-mono">
                    Email Address
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-cyan/50 focus:bg-white/10 rounded-xl px-4 py-3 text-xs md:text-sm text-white placeholder-white/20 outline-none transition-all"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="form-message" className="text-[10px] uppercase tracking-wider text-white/50 block mb-1.5 font-mono">
                    Message
                  </label>
                  <textarea
                    id="form-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-cyan/50 focus:bg-white/10 rounded-xl px-4 py-3 text-xs md:text-sm text-white placeholder-white/20 outline-none transition-all resize-none"
                    placeholder="Describe your project, internship, or query..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full btn-glass btn-primary justify-center text-xs md:text-sm"
                  style={{ padding: '12px 0' }}
                >
                  Send Message
                </button>
              </form>
              {status && (
                <div
                  className="mt-4 p-3 rounded-xl text-xs text-center border font-semibold font-display"
                  style={{
                    background: status.includes('successfully') ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.05)',
                    borderColor: status.includes('successfully') ? '#22c55e' : 'rgba(255,255,255,0.1)',
                    color: status.includes('successfully') ? '#22c55e' : 'white',
                  }}
                >
                  {status}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
