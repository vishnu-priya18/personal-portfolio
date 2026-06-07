'use client';

import { useEffect, useRef } from 'react';

const achievements = [
  {
    category: 'Speaker Forum & Presentations',
    title: 'AI & Smart Wearables Technical Seminar',
    detail: 'Presented a comprehensive analysis of neural networks integrated into consumer and clinical health wearables.',
    icon: '🎙️',
    color: 'var(--cyan)',
    glow: 'rgba(0,212,255,0.15)',
  },
  {
    category: 'Technical Events & Hackathons',
    title: 'National Level Biomedical Symposium',
    detail: 'Participated in a paper presentation on Smart IoT Stethoscope and real-time biological data streaming.',
    icon: '🏆',
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.15)',
  },
  {
    category: 'Workshops & Certifications',
    title: 'Biomedical Instrumentation & Biosensors Training',
    detail: 'Completed a hands-on physical workshop focused on calibration, testing, and sensor interface protocols.',
    icon: '⚙️',
    color: 'var(--orange)',
    glow: 'rgba(255,107,53,0.15)',
  },
  {
    category: 'Leadership & Participation',
    title: 'Academic Activities & Student Forums',
    detail: 'Active member of the student biomedical engineering forum, organizing technical symposiums and coding events.',
    icon: '🤝',
    color: '#22c55e',
    glow: 'rgba(34,197,94,0.15)',
  },
];

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap }          = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo('.achieve-card', { opacity: 0, y: 45 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: '#achievements', start: 'top 80%' },
        });
      }, sectionRef);
      return () => ctx.revert();
    };
    initGSAP();
  }, []);

  return (
    <section id="achievements" ref={sectionRef} className="section-wrapper">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 70% 80%, rgba(168,85,247,0.04), transparent)',
        }}
      />

      <div className="container-wide relative">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">04 — Achievements</p>
          <h2
            className="font-display font-bold mb-4"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,3rem)' }}
          >
            Academic & <span style={{ color: '#a855f7' }}>Leadership Roles</span>
          </h2>
          <div className="gradient-divider mt-6" />
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="achieve-card glass p-6 md:p-8 rounded-2xl border transition-all duration-300 hover:scale-[1.01]"
              style={{
                opacity: 0,
                borderColor: 'rgba(255,255,255,0.08)',
                boxShadow: `0 10px 30px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)`,
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    background: `${item.color}15`,
                    border: `1.5px solid ${item.color}35`,
                    boxShadow: `0 0 15px ${item.color}15`,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider block mb-1"
                    style={{ color: item.color, fontFamily: 'var(--font-mono)' }}
                  >
                    {item.category}
                  </span>
                  <h3
                    className="font-bold text-white text-base mb-2 font-display"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-xs leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
