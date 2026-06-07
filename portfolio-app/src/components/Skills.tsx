'use client';

import { useEffect, useRef, useState } from 'react';

const skills = [
  { name: 'Biomedical Instrumentation',           level: 88, tag: 'Domain',      color: '#22c55e' },
  { name: 'Medical Electronics',                  level: 84, tag: 'Domain',      color: '#a855f7' },
  { name: 'Healthcare Technology',                level: 87, tag: 'AI/Healthcare', color: '#10b981' },
  { name: 'AI Tools & Applications',              level: 82, tag: 'AI/Healthcare', color: 'var(--cyan)' },
  { name: 'Medical Coding',                       level: 75, tag: 'Domain',      color: '#3b82f6' },
  { name: 'Technical Presentations',              level: 90, tag: 'Soft Skills', color: '#f59e0b' },
  { name: 'Research Writing',                     level: 85, tag: 'Soft Skills', color: 'var(--orange)' },
  { name: 'Python, C & C++',                      level: 78, tag: 'Programming', color: '#3b82f6' },
  { name: 'Canva & Microsoft Office',             level: 90, tag: 'Tools',      color: '#ec4899' },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap }          = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo('.skill-item', { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: {
            trigger: '#skills',
            start: 'top 75%',
            onEnter: () => setTriggered(true),
          },
        });
      }, sectionRef);
      return () => ctx.revert();
    };
    initGSAP();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section-wrapper">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 20% 60%, rgba(255,107,53,0.05), transparent)',
        }}
      />

      <div className="container-wide relative">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">03 — Skills</p>
          <h2
            className="font-display font-bold mb-4"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,3rem)' }}
          >
            Technical <span style={{ color: 'var(--orange)' }}>Arsenal</span>
          </h2>
          <div className="gradient-divider mt-6" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, i) => (
              <div
                key={skill.name}
                className="skill-item glass p-6 rounded-2xl"
                style={{ opacity: 0 }}
              >
                {/* Top row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {/* Icon circle */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                      style={{ background: `${skill.color}20`, border: `1px solid ${skill.color}30`, color: skill.color }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-white/90">{skill.name}</p>
                      <p
                        className="text-xs"
                        style={{ color: skill.color, fontFamily: 'var(--font-mono)', opacity: 0.8 }}
                      >
                        {skill.tag}
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-xl font-bold font-display"
                    style={{ color: skill.color, fontFamily: 'var(--font-display)' }}
                  >
                    {triggered ? skill.level : 0}%
                  </span>
                </div>

                {/* Bar */}
                <div className="skill-bar-track">
                  <div
                    className="skill-bar-fill"
                    style={{
                      width: triggered ? `${skill.level}%` : '0%',
                      background: `linear-gradient(to right, ${skill.color}, ${skill.color}aa)`,
                      boxShadow: `0 0 10px ${skill.color}60`,
                      transitionDelay: `${i * 0.1}s`,
                    }}
                  />
                </div>

                {/* Level label */}
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-white/25">Beginner</span>
                  <span className="text-xs text-white/25">Expert</span>
                </div>
              </div>
            ))}
          </div>

          {/* Tools & Software */}
          <div className="mt-12">
            <p className="text-center section-label mb-6">Tools & Technologies</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Arduino', 'ESP32', 'Raspberry Pi', 'Python', 'MATLAB',
                'VS Code', 'IoT Platforms', 'ECG Analysis', 'Signal Processing',
                'Machine Learning', 'TensorFlow', 'OpenCV',
              ].map(tool => (
                <span
                  key={tool}
                  className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 cursor-default"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.65)',
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
