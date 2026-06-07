'use client';

import { useEffect, useRef } from 'react';

const highlights = [
  {
    icon: '🔬',
    title: 'Biomedical Systems Exposure',
    desc: 'Hands-on experience with clinical biomedical equipment and healthcare system workflows.',
  },
  {
    icon: '⚙️',
    title: 'Healthcare Tech Workflow',
    desc: 'Understanding of end-to-end healthcare technology pipeline from device to patient application.',
  },
  {
    icon: '💡',
    title: 'Real-Time Medical Innovation',
    desc: 'Participated in live medical technology projects in a real-world healthcare innovation environment.',
  },
  {
    icon: '🏥',
    title: 'Hands-on Healthcare Experience',
    desc: 'Direct practical exposure to hospital-grade medical systems and clinical protocols.',
  },
];

export default function Internship() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap }          = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo('.intern-hero', { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '#internship', start: 'top 80%' },
        });
        gsap.fromTo('.intern-highlight', { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: '#internship', start: 'top 70%' },
        });
      }, sectionRef);
      return () => ctx.revert();
    };
    initGSAP();
  }, []);

  return (
    <section id="internship" ref={sectionRef} className="section-wrapper">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(34,197,94,0.04), transparent)',
        }}
      />

      <div className="container-wide relative">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">06 — Internship</p>
          <h2
            className="font-display font-bold mb-4"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,3rem)' }}
          >
            Real World <span style={{ color: '#22c55e' }}>Experience</span>
          </h2>
          <div className="gradient-divider mt-6" />
        </div>

        {/* Main Internship Banner */}
        <div
          className="intern-hero glass-strong rounded-3xl p-8 md:p-12 mb-12"
          style={{ opacity: 0 }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Logo/Icon Area */}
            <div
              className="flex-shrink-0 w-24 h-24 rounded-2xl flex items-center justify-center text-4xl"
              style={{
                background: 'linear-gradient(135deg, rgba(34,197,94,0.2), rgba(0,212,255,0.1))',
                border: '2px solid rgba(34,197,94,0.3)',
                boxShadow: '0 0 30px rgba(34,197,94,0.15)',
              }}
            >
              🏥
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3
                  className="font-bold text-3xl"
                  style={{
                    fontFamily: 'var(--font-display)',
                    background: 'linear-gradient(135deg, #22c55e, var(--cyan))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Medsby
                </h3>
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: 'rgba(34,197,94,0.15)',
                    border: '1px solid rgba(34,197,94,0.3)',
                    color: '#22c55e',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  ✓ Completed
                </span>
              </div>
              <p
                className="text-white/50 text-sm mb-4"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Healthcare Technology Internship
              </p>
              <p className="text-white/70 text-base leading-relaxed max-w-2xl">
                Gained real-world exposure to biomedical systems and healthcare technology workflows at Medsby —
                a cutting-edge medical innovation environment that bridges clinical practice with emerging technology.
              </p>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {highlights.map((h, i) => (
            <div
              key={i}
              className="intern-highlight internship-highlight rounded-2xl"
              style={{ opacity: 0 }}
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                style={{
                  background: 'rgba(34,197,94,0.1)',
                  border: '1px solid rgba(34,197,94,0.2)',
                }}
              >
                {h.icon}
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white/90 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  {h.title}
                </h4>
                <p className="text-xs text-white/50 leading-relaxed">{h.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Key Takeaway */}
        <div
          className="mt-12 text-center py-8 px-6 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(34,197,94,0.06), rgba(0,212,255,0.04))',
            border: '1px solid rgba(34,197,94,0.12)',
          }}
        >
          <p className="text-white/60 text-base italic max-w-2xl mx-auto">
            "The internship at Medsby was a transformative experience that deepened my understanding of how
            technology and medicine intersect to create meaningful patient impact."
          </p>
          <p className="text-white/30 text-sm mt-3" style={{ fontFamily: 'var(--font-mono)' }}>
            — Vishnu Priya
          </p>
        </div>
      </div>
    </section>
  );
}
