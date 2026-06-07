'use client';

import { useEffect, useRef } from 'react';

const timeline = [
  {
    degree: 'B.E Biomedical Engineering',
    institution: 'Sona College of Technology',
    period: '2024 – 2028',
    detail: 'Currently pursuing Bachelor of Engineering in Biomedical Engineering, focusing on AI-driven healthcare systems and smart medical device development.',
    icon: '🎓',
    color: 'var(--cyan)',
    glow: 'rgba(0,212,255,0.3)',
    tags: ['AI Healthcare', 'IoT Devices', 'Signal Processing'],
    badge: 'Current',
  },
  {
    degree: '12th Grade — Higher Secondary',
    institution: 'Saraswati Matric Higher Secondary School, Valapady',
    period: '2022',
    detail: 'Completed Higher Secondary Education with a strong foundation in science and mathematics.',
    icon: '📚',
    color: 'var(--orange)',
    glow: 'rgba(255,107,53,0.3)',
    tags: ['Science', 'Mathematics'],
    score: '74.6%',
  },
  {
    degree: '10th Grade — Secondary Education',
    institution: 'Government Girls Higher Secondary School, Belur',
    period: '2021',
    detail: 'Completed Secondary Education — a Corona batch, demonstrating resilience and adaptability during unprecedented global challenges.',
    icon: '🏫',
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.3)',
    tags: ['Corona Batch', 'Resilience'],
    badge: '🦠 Corona Batch',
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap }          = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo('.edu-card', { opacity: 0, x: -50 }, {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', stagger: 0.2,
          scrollTrigger: { trigger: '#education', start: 'top 80%' },
        });
      }, sectionRef);

      return () => ctx.revert();
    };
    initGSAP();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="section-wrapper">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(0,212,255,0.04), transparent)',
        }}
      />

      <div className="container-wide relative">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">02 — Education</p>
          <h2
            className="font-display font-bold mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            }}
          >
            Academic <span style={{ color: 'var(--cyan)' }}>Journey</span>
          </h2>
          <div className="gradient-divider mt-6" />
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="timeline-line" style={{ left: '19px' }} />

          <div className="flex flex-col gap-12 pl-16">
            {timeline.map((item, i) => (
              <div
                key={i}
                className="edu-card relative"
                style={{ opacity: 0 }}
              >
                {/* Dot */}
                <div
                  className="timeline-dot absolute"
                  style={{
                    left: '-57px',
                    top: '0',
                    width: '38px',
                    height: '38px',
                    background: `linear-gradient(135deg, ${item.color}, ${item.glow})`,
                    border: `2px solid ${item.color}`,
                    boxShadow: `0 0 20px ${item.glow}`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                  }}
                >
                  {item.icon}
                </div>

                {/* Card */}
                <div
                  className="glass p-6 rounded-2xl transition-all duration-300 hover:scale-[1.01]"
                  style={{ borderColor: `${item.color}25` }}
                >
                  {/* Top row */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3
                        className="font-semibold text-lg mb-1"
                        style={{ color: item.color, fontFamily: 'var(--font-display)' }}
                      >
                        {item.degree}
                      </h3>
                      <p className="text-white/70 text-sm">{item.institution}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{
                          background: `${item.color}20`,
                          border: `1px solid ${item.color}40`,
                          color: item.color,
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {item.period}
                      </span>
                      {item.score && (
                        <span
                          className="px-3 py-1 rounded-full text-xs font-bold"
                          style={{
                            background: 'rgba(34,197,94,0.15)',
                            border: '1px solid rgba(34,197,94,0.3)',
                            color: '#22c55e',
                          }}
                        >
                          Score: {item.score}
                        </span>
                      )}
                      {item.badge && (
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            background: 'rgba(168,85,247,0.15)',
                            border: '1px solid rgba(168,85,247,0.3)',
                            color: '#a855f7',
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Detail */}
                  <p className="text-white/55 text-sm leading-relaxed mb-4">{item.detail}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'rgba(255,255,255,0.6)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
